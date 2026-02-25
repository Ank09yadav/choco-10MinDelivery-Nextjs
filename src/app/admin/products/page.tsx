// app/admin/products/page.tsx (or ProductPage.tsx)
"use client";

import { deleteProduct, getAllProducts, Product, updateProduct } from "@/http/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductTable from "./productTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/http/api";
import { productValidator } from "@/lib/validators/productValidator"
import { id } from "zod/v4/locales";
import { useState } from "react";


type FormValues = z.infer<typeof productValidator>;

const ProductPage = () => {
  const [update, setUpdate] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (data: FormData) => {
      return createProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product created successfully");
      const el = document.getElementById("cp");
      if (el) el.classList.add("hidden");
    }
  });
  const { mutate: deleteMutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id: number) => {
      return deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      alert("Product deleted successfully");
      return true;
    },
    onError: () => {
      alert("Failed to delete product");
      return false;
    }
  })

  //update the product
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);
  const handleEditClick = (productId: number) => {
    setCurrentProductId(productId);
    setUpdate(true);

    // Find the product being edited from our query cache
    const productToEdit = data?.find((p) => p.id === productId);
    if (productToEdit) {
      // Pre-fill the form with the existing product's details
      form.reset({
        name: productToEdit.name,
        price: productToEdit.price,
        description: productToEdit.description || "",
        // Note: You cannot programmatically set a File List for security reasons, so image stays blank
      });
    }

    const el = document.getElementById("cp");
    if (el) el.classList.remove("hidden");
    setTimeout(() => {
      el?.classList.remove("translate-x-full");
      el?.classList.add("translate-x-0");
    }, 10);
  };
  const { mutate: updateMutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: ({ id, data }: { id: number; data: FormData }) => {
      return updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      alert("Product updated successfully");
      const el = document.getElementById("cp");
      if (el) {
        el.classList.add("hidden");
      }
      return true;
    },
    onError: (err: any) => {
      console.error(err);
      alert("Failed to update product");
      return false;
    }
  })


  const { data, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(productValidator),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const handleOnSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    // Extract the actual File object from the FileList
    const fileList = data.image as unknown as FileList;
    if (fileList && fileList.length > 0) {
      formData.append("image", fileList[0]);
    }

    if (update && currentProductId) {
      updateMutate({ id: currentProductId, data: formData });
    } else {
      createMutate(formData);
    }
  }

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load products.</p>;

  return (
    <div className="p-4 md:p-6">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">Products</h1>
        <button className="bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400" onClick={() => {
          // Clear the form and set state completely to Add Mode
          setUpdate(false);
          setCurrentProductId(null);
          form.reset({ name: "", description: "", price: 0 });

          const element = document.getElementById("cp")
          if (element) {
            element.classList.remove("hidden");

            setTimeout(() => {
              element.classList.remove("translate-x-full");
              element.classList.add("translate-x-0");
            }, 10);
          }
        }} >Add Product</button>
      </div>

      <div id="cp" className="z-5 w-96 h-102 bg-white shadow-2xl  transform translate-x-full transition-transform durastion-500 ease-in-out flex-col m-3 hidden absolute right-0  ">
        <div className="flex justify-between p-4 text white"><h2>{update ? "Update Product" : "Product Details"}</h2><h3 className="cursor-pointer" onClick={() => { const el = document.getElementById("cp"); if (el) { el.classList.add("hidden") } }} >X</h3></div>
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={form.handleSubmit(handleOnSubmit)} action="">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
              <input
                {...form.register("name")}
                type="text"
                placeholder="chocolate"
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message as string}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
              <input
                {...form.register("price", { valueAsNumber: true })}
                type="number"
                placeholder="0.00"
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm"
              />
              {form.formState.errors.price && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.price.message as string}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
              <input
                {...form.register("image")}
                type="file"

                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm"
              />
              {form.formState.errors.image && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.image.message as string}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea
                {...form.register("description")}
                rows={4}
                placeholder="Describe your product..."
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm resize-none"
              ></textarea>
              {form.formState.errors.description && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message as string}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 mt-4 font-bold hover:bg-gray-800 transition-all active:scale-95"
            >
              SUBMIT PRODUCT
            </button>
          </form>
        </div>
      </div>
      <ProductTable products={data ?? []}
        onDelete={deleteMutate}
        onUpdate={(productId) => handleEditClick(productId)}
      />
    </div>
  );
};

export default ProductPage;
