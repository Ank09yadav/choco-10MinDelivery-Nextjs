"use client"
import React from 'react'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/http/api'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'


const Products = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 10 * 1000,
  })
  const skeletons = Array.from({ length: 4 })
  return (
    <section className='bg-[#f5f5f5] px-5 pt-14 md:py-20'>
      <div className='mx-auto max-w-6xl' >
        <div className='flex items-center justify-center gap-20'>
          <Separator className='h-0.5 w-20 bg-gray-400' />
          <h2 className='whitespace-nowrap text-2xl font-bold text-gray-600'>Products</h2>
          <Separator className='h-0.5 w-20 bg-gray-400' />
        </div>
        <div className='mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {isLoading ? <>
            {skeletons.map((_, i) => (
              <div key={i} className='flex flex-col items-start justify-center gap-5'>
                <Skeleton className='h-48 w-full rounded-t-md bg-gray-300' />
                <div className='w-full'>
                  <Skeleton className='h-6 w-full mb-4 bg-gray-300' />
                  <Skeleton className='h-6 w-full mb-4 bg-gray-300' />
                </div>
              </div>
            ))}
          </> : <>

            {products?.map((product) => (
              <div key={product.id} className='flex flex-col items-start justify-center gap-5'>
                <Image src={`/assets/${product.image}`} alt="product1" width={0} height={0} sizes='100vw' style={{ width: '100%' }} className='aspect=square rounded-t-md object-cover shadow-lg hover:cursor-pointer' />
                <div className='w-full'>
                  <p className='text-lg font-semibold text-brown-900'>{product.name}</p>
                  <div className='mt-1 space-x-2'>
                    <span className='font-bold'>{product.price}</span>
                  </div>
                  <Link href={`/product/${product.id}`} ><Button size="sm" className='mt-4 w-full bg-gray-700 hover:bg-gray-900 '>buy Now</Button></Link>
                </div>
              </div>
            ))}

          </>}

        </div>

      </div>

    </section>
  )
}

export default Products
