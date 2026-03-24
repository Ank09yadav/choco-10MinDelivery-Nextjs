
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createInventory, getAllInventories, getAllProducts, getAllWarehouses, updateInventory, deleteInventory, Inventory as InventoryType } from "@/http/api";
import { inventoryValidator } from "@/lib/validators/inventoryValidator";
import InventoryTable from "./inventoryTable";

type FormValues = z.infer<typeof inventoryValidator>;

const InventoryPage = () => {
    const [update, setUpdate] = useState(false);
    const [currentInventoryId, setCurrentInventoryId] = useState<number | null>(null);
    const queryClient = useQueryClient();

    // Fetch Inventories
    const { data: inventories, isLoading: invLoading, isError: invError } = useQuery<InventoryType[], Error>({
        queryKey: ["inventories"],
        queryFn: getAllInventories,
    });

    // Fetch Warehouses and Products for the form
    const { data: warehouses } = useQuery({
        queryKey: ["warehouses"],
        queryFn: getAllWarehouses,
    });

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(inventoryValidator),
        defaultValues: {
            sku: "",
            warehouseId: 0,
            productId: 0,
        },
    });

    const { mutate: createMutate } = useMutation({
        mutationKey: ["createInventory"],
        mutationFn: (data: FormValues) => createInventory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventories"] });
            alert("Inventory record created successfully");
            closeDrawer();
        },
        onError: (err) => {
            console.error(err);
            alert("Failed to create inventory. Check if the SKU is 8 characters long.");
        }
    });

    const { mutate: deleteMutate } = useMutation({
        mutationKey: ["deleteInventory"],
        mutationFn: (id: number) => deleteInventory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventories"] });
            alert("Inventory record deleted successfully");
        },
        onError: () => {
            alert("Failed to delete inventory record");
        }
    });

    const { mutate: updateMutate } = useMutation({
        mutationKey: ["updateInventory"],
        mutationFn: ({ id, data }: { id: number; data: FormValues }) => updateInventory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["inventories"] });
            alert("Inventory record updated successfully");
            closeDrawer();
        },
        onError: () => {
            alert("Failed to update inventory record");
        }
    });

    const handleOnSubmit = async (data: FormValues) => {
        if (update && currentInventoryId) {
            updateMutate({ id: currentInventoryId, data });
        } else {
            createMutate(data);
        }
    }

    const openDrawer = () => {
        const element = document.getElementById("inventory-drawer")
        if (element) {
            element.classList.remove("hidden");
            setTimeout(() => {
                element.classList.remove("translate-x-full");
                element.classList.add("translate-x-0");
            }, 10);
        }
    };

    const closeDrawer = () => {
        const el = document.getElementById("inventory-drawer");
        if (el) {
            el.classList.add("translate-x-full");
            setTimeout(() => {
                el.classList.add("hidden");
            }, 500);
        }
    };

    const handleEditClick = (invId: number) => {
        setCurrentInventoryId(invId);
        setUpdate(true);
        const invToEdit = inventories?.find((i) => i.id === invId);
        if (invToEdit) {
            form.reset({
                sku: invToEdit.sku,
                warehouseId: invToEdit.warehouseId || 0,
                productId: invToEdit.productId || 0,
            });
        }
        openDrawer();
    };



    return (
        <div className="p-4 md:p-6 relative min-h-screen bg-gray-50/30">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight transition-all">Inventory</h1>
                    <p className="text-gray-500 text-sm mt-1">Track and manage stock levels across all warehouses.</p>
                </div>
                <button 
                    className="bg-black text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-800 transition-all active:scale-[0.98] shadow-sm"
                    onClick={() => {
                        setUpdate(false);
                        setCurrentInventoryId(null);
                        form.reset({ sku: "", warehouseId: 0, productId: 0 });
                        openDrawer();
                    }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Add Stock
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto">
                {invLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Fetching inventory...</p>
                    </div>
                ) : invError ? (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Unable to load inventory data</h3>
                        <p className="text-red-700/80 mt-1">There was a problem connecting to the server. Please ensure your backend is running.</p>
                        <button 
                            onClick={() => queryClient.invalidateQueries({ queryKey: ["inventories"] })}
                            className="mt-6 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (

                    <InventoryTable 
                        inventories={inventories ?? []}
                        onDelete={(id) => deleteMutate(id)}
                        onUpdate={(id) => handleEditClick(id)}
                    />

                )}
            </div>

            {/* Drawer */}
            <div id="inventory-drawer" className="z-[100] w-[420px] h-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] transform translate-x-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col hidden fixed top-0 right-0">
                <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{update ? "Update Inventory" : "New Inventory Item"}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Link a product to a warehouse location.</p>
                    </div>
                    <button className="text-3xl text-gray-400 hover:text-gray-900 transition-colors" onClick={closeDrawer}>&times;</button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8">
                    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">SKU Identifier (8 Chars)</label>
                            <input
                                {...form.register("sku")}
                                type="text"
                                placeholder="PROD0001"
                                maxLength={8}
                                className="w-full bg-gray-50 border-gray-200 border p-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black rounded-xl transition-all font-mono"
                            />
                            {form.formState.errors.sku && (
                                <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{form.formState.errors.sku.message as string}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Assign Warehouse</label>
                            <select
                                {...form.register("warehouseId", { valueAsNumber: true })}
                                className="w-full bg-gray-50 border-gray-200 border p-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black rounded-xl transition-all appearance-none cursor-pointer"
                            >
                                <option value={0}>Select Warehouse</option>
                                {warehouses?.map((w) => (
                                    <option key={w.id} value={w.id}>{w.name}</option>
                                ))}
                            </select>
                            {form.formState.errors.warehouseId && (
                                <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{form.formState.errors.warehouseId.message as string}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Select Product</label>
                            <select
                                {...form.register("productId", { valueAsNumber: true })}
                                className="w-full bg-gray-50 border-gray-200 border p-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black rounded-xl transition-all appearance-none cursor-pointer"
                            >
                                <option value={0}>Select Product</option>
                                {products?.map((p) => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            {form.formState.errors.productId && (
                                <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{form.formState.errors.productId.message as string}</p>
                            )}
                        </div>

                        <div className="pt-8 mt-auto border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
                            >
                                <span className="tracking-wide uppercase text-sm">{update ? "Update Entry" : "Add to Inventory"}</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
