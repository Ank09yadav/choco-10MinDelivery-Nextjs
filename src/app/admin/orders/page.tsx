"use client";

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '@/http/api'
import OrderTable from './orderTable'

const OrdersPage = () => {
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: getAllOrders,
    });

    if (isLoading) return <p className="p-4">Loading orders...</p>;
    if (isError) return <p className="p-4 text-red-500 font-bold">Failed to load orders.</p>;

    return (
        <div className='p-4 md:p-6'>
            <div className='flex items-center justify-between'>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manage Orders</h1>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Total: {orders?.length || 0}</span>
                </div>
            </div>
            <OrderTable orders={orders || []} />
        </div>
    )
}

export default OrdersPage