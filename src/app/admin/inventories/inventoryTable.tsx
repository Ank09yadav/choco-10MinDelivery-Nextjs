"use client";

import { Inventory } from "@/http/api";

export default function InventoryTable({ 
    inventories, 
    onDelete, 
    onUpdate 
}: { 
    inventories: Inventory[], 
    onDelete: (id: number) => void, 
    onUpdate: (id: number) => void 
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white mt-6">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Warehouse</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventories.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                No inventory records found.
              </td>
            </tr>
          ) : (
            inventories.map((i) => (
              <tr key={i.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">#{i.id}</td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600">{i.sku}</td>
                <td className="px-4 py-3">{i.warehouse}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{i.product}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => onUpdate(i.id)}
                  >
                    Update
                  </button>
                  <button 
                    className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={() => onDelete(i.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
