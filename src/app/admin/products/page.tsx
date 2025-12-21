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
        <button className="bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400" onClick={()=>{
           const element= document.getElementById("cp")
            if(element){
              element.classList.remove("hidden");
      
      
              setTimeout(() => {
              element.classList.remove("translate-x-full");
              element.classList.add("translate-x-0");
            }, 10);
            }
        }} >Add Product</button>
      </div>
      <div id="cp" className="z-5 w-96 h-102 bg-white shadow-2xl  transform translate-x-full transition-transform durastion-500 ease-in-out flex-col m-3 hidden absolute right-0  ">
        <div className="flex justify-between p-4 text white"><h2>Product Details</h2><h3 className="cursor-pointer" onClick={()=>{const el= document.getElementById("cp"); if(el) {el.classList.add("hidden")}   }} >X</h3></div>
        <div className="flex-1 overflow-y-auto p-6">
          <form action="">
              <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Premium Cotton Kurta" 
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
              <input 
                type="file" 
                placeholder="choose file" 
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea 
                rows={4} 
                placeholder="Describe your product..." 
                className="w-full border border-gray-300 p-2 text-black focus:outline-none focus:border-black rounded-sm resize-none"
              ></textarea>
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
      <ProductTable products={data ?? []} />
    </div>
  );
};

export default ProductPage;
