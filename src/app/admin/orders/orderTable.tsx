"use client";

import React from "react";

interface Order {
  id: number;
  productName: string;
  userName: string;
  quantity: number;
  address: string;
  status: string;
  createdAt: string;
}

const OrderTable = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white mt-6 shadow-sm">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs sticky top-0 shadow-sm">
          <tr>
            <th className="px-5 py-4 border-b font-bold">Order ID</th>
            <th className="px-5 py-4 border-b font-bold">Customer</th>
            <th className="px-5 py-4 border-b font-bold">Product</th>
            <th className="px-5 py-4 border-b font-bold">Quantity</th>
            <th className="px-5 py-4 border-b font-bold">Address</th>
            <th className="px-5 py-4 border-b font-bold">Status</th>
            <th className="px-5 py-4 border-b font-bold">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-5 py-10 text-center text-gray-500 italic font-medium">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors animate-in fade-in duration-300">
                <td className="px-5 py-4 font-semibold text-gray-900 leading-none">#{order.id}</td>
                <td className="px-5 py-4 text-gray-700 font-medium">{order.userName}</td>
                <td className="px-5 py-4 text-gray-700 font-medium">{order.productName}</td>
                <td className="px-5 py-4 text-center text-gray-700">{order.quantity}</td>
                <td className="px-5 py-4 max-w-[200px] truncate text-gray-500 text-xs" title={order.address}>
                  {order.address}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    order.status === 'received' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
                    order.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500 font-mono text-xs">
                  {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
