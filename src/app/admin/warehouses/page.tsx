
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createWarehouse, getAllWarehouses, updateWarehouse, deleteWarehouse, Warehouse as WarehouseType } from "@/http/api";
import { warehouseValidator } from "@/lib/validators/warehouseValidator";
import WarehouseTable from "./warehouseTable";

type FormValues = z.infer<typeof warehouseValidator>;


const Warehouse = () => {
    const [update, setUpdate] = useState(false);
    const [currentWarehouseId, setCurrentWarehouseId] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const { data: warehouses, isLoading, isError } = useQuery<WarehouseType[], Error>({
        queryKey: ["warehouses"],
        queryFn: getAllWarehouses,
    });

    const form = useForm<FormValues>({
        resolver: zodResolver(warehouseValidator),
        defaultValues: {
            name: "",
            pincode: 0,
        },
    });


    const { mutate: createMutate } = useMutation({
        mutationKey: ["createWarehouse"],
        mutationFn: (data: FormValues) => createWarehouse(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warehouses"] });
            alert("Warehouse created successfully");
            closeDrawer();
        },
        onError: (err) => {
            console.error(err);
            alert("Failed to create warehouse");
        }
    });

    const { mutate: deleteMutate } = useMutation({
        mutationKey: ["deleteWarehouse"],
        mutationFn: (id: number) => deleteWarehouse(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warehouses"] });
            alert("Warehouse deleted successfully");
        },
        onError: () => {
            alert("Failed to delete warehouse");
        }
    });

    const { mutate: updateMutate } = useMutation({
        mutationKey: ["updateWarehouse"],
        mutationFn: ({ id, data }: { id: number; data: FormValues }) => updateWarehouse(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warehouses"] });
            alert("Warehouse updated successfully");
            closeDrawer();
        },
        onError: () => {
            alert("Failed to update warehouse");
        }
    });

    const handleOnSubmit = async (data: FormValues) => {
        if (update && currentWarehouseId) {
            updateMutate({ id: currentWarehouseId, data });
        } else {
            createMutate(data);
        }
    }

    const openDrawer = () => {
        const element = document.getElementById("warehouse-drawer")
        if (element) {
            element.classList.remove("hidden");
            setTimeout(() => {
                element.classList.remove("translate-x-full");
                element.classList.add("translate-x-0");
            }, 10);
        }
    };

    const closeDrawer = () => {
        const el = document.getElementById("warehouse-drawer");
        if (el) {
            el.classList.add("translate-x-full");
            setTimeout(() => {
                el.classList.add("hidden");
            }, 500);
        }
    };

    const handleEditClick = (warehouseId: number) => {
        setCurrentWarehouseId(warehouseId);
        setUpdate(true);
        const warehouseToEdit = warehouses?.find((w) => w.id === warehouseId);
        if (warehouseToEdit) {
            form.reset({
                name: warehouseToEdit.name,
                pincode: warehouseToEdit.pincode,
            });
        }
        openDrawer();
    };



    return (
        <div className="p-4 md:p-6 relative min-h-screen bg-gray-50/30">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight transition-all">Warehouses</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all your storage locations from here.</p>
                </div>
                <button 
                    className="bg-black text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:bg-gray-800 transition-all active:scale-[0.98] shadow-sm"
                    onClick={() => {
                        setUpdate(false);
                        setCurrentWarehouseId(null);
                        form.reset({ name: "", pincode: 0 });
                        openDrawer();
                    }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    Add Warehouse
                </button>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                        <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-500 font-medium">Fetching warehouses...</p>
                    </div>
                ) : isError ? (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
                        <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Unable to load data</h3>
                        <p className="text-red-700/80 mt-1">There was a problem connecting to the server. Please ensure your backend is running.</p>
                        <button 
                            onClick={() => queryClient.invalidateQueries({ queryKey: ["warehouses"] })}
                            className="mt-6 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (

                    <WarehouseTable 
                        warehouses={warehouses ?? []}
                        onDelete={(id) => deleteMutate(id)}
                        onUpdate={(id) => handleEditClick(id)}
                    />

                )}
            </div>

            {/* Drawer */}
            <div id="warehouse-drawer" className="z-[100] w-[420px] h-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] transform translate-x-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col hidden fixed top-0 right-0">
                <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{update ? "Update Warehouse" : "New Warehouse"}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Enter the storage facility details below.</p>
                    </div>
                    <button className="text-3xl text-gray-400 hover:text-gray-900 transition-colors" onClick={closeDrawer}>&times;</button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8">
                    <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Warehouse Name</label>
                            <input
                                {...form.register("name")}
                                type="text"
                                placeholder="Main Distribution Hub"
                                className="w-full bg-gray-50 border-gray-200 border p-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black rounded-xl transition-all"
                            />
                            {form.formState.errors.name && (
                                <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{form.formState.errors.name.message as string}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest">Pincode (ZIP)</label>
                            <input
                                {...form.register("pincode", { valueAsNumber: true })}
                                type="number"
                                placeholder="110001"
                                className="w-full bg-gray-50 border-gray-200 border p-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black rounded-xl transition-all"
                            />
                            {form.formState.errors.pincode && (
                                <p className="text-red-500 text-[11px] font-bold mt-1.5 ml-1">{form.formState.errors.pincode.message as string}</p>
                            )}
                        </div>

                        <div className="pt-8 mt-auto border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
                            >
                                <span className="tracking-wide uppercase text-sm">{update ? "Update Warehouse" : "Submit Details"}</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Warehouse;
