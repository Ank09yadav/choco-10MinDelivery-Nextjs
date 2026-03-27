import React from 'react'




const DeliveryPersonTable = () => {
  return (
    <div className='overflow-x-auto rounded-lg border bg-white'>
        <table className='w-full border-collapse'>
            <thead>
                <tr>
                    <th className='border border-gray-300 px-4 py-2'>Name</th>
                    <th className='border border-gray-300 px-4 py-2'>Email</th>
                    <th className='border border-gray-300 px-4 py-2'>Phone</th>
                    <th className='border border-gray-300 px-4 py-2'>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='border border-gray-300 px-4 py-2'>John Doe</td>
                    <td className='border border-gray-300 px-4 py-2'>[EMAIL_ADDRESS]</td>
                    <td className='border border-gray-300 px-4 py-2'>1234567890</td>
                    <td className='border border-gray-300 px-4 py-2'>
                        <button className='bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400'>Edit</button>
                        <button className='bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400'>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default DeliveryPersonTable