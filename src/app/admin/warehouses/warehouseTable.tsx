"use client";

import { Warehouse } from "@/http/api";

export default function WarehouseTable({ 
    warehouses, 
    onDelete, 
    onUpdate 
}: { 
    warehouses: Warehouse[], 
    onDelete: (id: number) => void, 
    onUpdate: (id: number) => void 
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white mt-6">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Pincode</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {warehouses.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No warehouses found.
              </td>
            </tr>
          ) : (
            warehouses.map((w) => (
              <tr key={w.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">#{w.id}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{w.name}</td>
                <td className="px-4 py-3">{w.pincode}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button 
                    className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => onUpdate(w.id)}
                  >
                    Update
                  </button>
                  <button 
                    className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    onClick={() => onDelete(w.id)}
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
