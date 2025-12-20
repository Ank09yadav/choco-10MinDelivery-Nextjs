// app/admin/products/ProductTable.tsx
"use client";

import { Product } from "@/http/api";
import Image from "next/image";

export default function ProductTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Updated At</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Image src={`/assets/${p.image}`} alt={p.name} width={48} height={48} className="object-cover rounded" />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-3">₹{p.price}</td>
                <td className="px-4 py-3">{p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
                  <button className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
