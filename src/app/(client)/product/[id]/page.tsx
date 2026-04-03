"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getProductById, Product } from '@/http/api'
import Header from '../../_components/header'
import Footer from '../../_components/footer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'


const SignleProductPage = () => {
  const params = useParams()
  const router = useRouter()
  const {data:product,isLoading}=useQuery<Product>({
    queryKey:['product',params.id],
    queryFn:()=>getProductById(Number(params.id))

  })
 
  return (
    <>
    <Header/>
    <section className='bg-[#f8f9fa] px-5 py-8 md:py-16 min-h-screen'>
      <div className='max-w-6xl mx-auto mb-8'>
        <button 
          onClick={() => router.back()} 
          className='flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium group'
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block font-mono">←</span> Back to products
        </button>
      </div>

      <div className='mx-auto max-w-6xl bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100'>
          <div className='flex flex-col md:flex-row'>
              {/* Image Section (35% on desktop) */}
              <div className='w-full md:w-[35%] bg-gray-50 flex items-center justify-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-gray-100'>
                {isLoading ? (
                  <Skeleton className='w-full aspect-square rounded-2xl bg-gray-200' />
                ) : (
                  <div className="relative w-full aspect-square group">
                    <Image 
                      src={`/assets/${product?.image}`} 
                      alt={`${product?.name}`} 
                      width={500} 
                      height={500} 
                      className='w-full h-full object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105' 
                    />
                  </div>
                )}
              </div>

              {/* Details Section (65% on desktop) */}
              <div className='w-full md:w-[65%] p-8 md:p-14 flex flex-col'>
                {isLoading ? (
                  <div className='space-y-6'>
                    <Skeleton className='h-4 w-24 bg-gray-200' />
                    <Skeleton className='h-12 w-3/4 bg-gray-200' />
                    <Skeleton className='h-6 w-1/4 bg-gray-200' />
                    <div className='space-y-3 pt-6'>
                      <Skeleton className='h-4 w-full bg-gray-200' />
                      <Skeleton className='h-4 w-full bg-gray-200' />
                      <Skeleton className='h-4 w-2/3 bg-gray-200' />
                    </div>
                    <div className="flex gap-4 mt-10">
                       <Skeleton className='h-14 w-40 bg-gray-200 rounded-full' />
                       <Skeleton className='h-14 w-40 bg-gray-200 rounded-full' />
                    </div>
                  </div>
                ) : (
                  <div className='h-full flex flex-col'>
                    <div className="mb-4">
                      <span className='px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold tracking-widest uppercase rounded-md'>Direct from farm</span>
                    </div>
                    <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight'>
                      {product?.name}
                    </h2>
                    
                    <div className='flex items-center gap-4 mb-8'>
                      <span className='text-3xl font-bold text-gray-900 tracking-tight'>$ {product?.price}</span>
                      <div className="h-5 w-px bg-gray-200 mx-2"></div>
                      {/* <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Available Now
                      </span> */}
                    </div>
                    
                    <div className='border-t border-gray-100 pt-8 mb-10'>
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">The Pure Cocoa Experience</h3>
                      <p className='text-gray-500 text-lg leading-relaxed font-medium'>{product?.description || "Experience the direct from farm freshness with our premium selection. Handpicked and delivered to your doorstep within 10 minutes."}</p>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-4">
                      <Button size="lg" className='h-16 px-10 bg-gray-900 hover:bg-black text-white rounded-2xl text-lg font-bold shadow-xl shadow-gray-200 transition-all hover:-translate-y-1 active:translate-y-0'>
                        Add to Cart
                      </Button>
                      <Button variant="outline" size="lg" className='h-16 px-10 rounded-2xl text-lg font-bold border-2 border-gray-200 hover:bg-gray-50 transition-all hover:-translate-y-1 active:translate-y-0'>
                        Buy Now
                      </Button>
                    </div>
                  </div>
                )}
              </div>
          </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default SignleProductPage