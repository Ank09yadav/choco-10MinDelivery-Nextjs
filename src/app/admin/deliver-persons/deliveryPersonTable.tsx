'use client'
import React from 'react'
import { DeliveryPerson } from '@/http/api';

interface DeliveryPersonTableProps {
  deliveryPersons: DeliveryPerson[];
  onDelete: (id: number) => void;
  onUpdate: (deliveryPerson: DeliveryPerson) => void;
}

const DeliveryPersonTable = ({ deliveryPersons, onDelete, onUpdate }: DeliveryPersonTableProps) => {
  return (
    <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm'>
      <table className='w-full text-left'>
        <thead className="bg-gray-50/50">
          <tr>
            <th className='px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest'>Name</th>
            <th className='px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest'>Phone</th>
            <th className='px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest'>Warehouse</th>
            <th className='px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right'>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {deliveryPersons.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-medium">
                No delivery persons available.
              </td>
            </tr>
          ) : (
            deliveryPersons.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                      {d.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{d.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-medium">{d.warehouse || 'N/A'}</span>
                    {d.warehousePincode && (
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">PIN: {d.warehousePincode}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => onUpdate(d)}
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => onDelete(d.id)}
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DeliveryPersonTable