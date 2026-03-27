import React from 'react'
import { Plus } from 'lucide-react'
import DeliveryPersonTable from './deliveryPersonTable'
const DeliveryPersonsPage = () => {
  return (
    <div className='p-4 md:6 ' >
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'> Delivery Persons </h1>
        <button className="bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400" >+ Add Delivery Person</button>
      </div>
      <DeliveryPersonTable/>    
    </div>
  )
}

export default DeliveryPersonsPage