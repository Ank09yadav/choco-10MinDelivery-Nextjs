// app/admin/products/page.tsx (or ProductPage.tsx)
"use client";

import { getAllProducts, Product } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import ProductTable from "./productTable";

const ProductPage = () => {

  const { data, isLoading, isError } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  console.log("Products from query:", data); // data is the array now

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load products.</p>;

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">Products</h1>
        <button className="bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400">Add Product</button>
      </div>
      <ProductTable products={data ?? []} />
    </div>
  );
};

export default ProductPage;
