import React from "react";


const Warehouse = ()=>{
    
    return(
        <div className="p-4 md:p6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold mb-4">Warehouse</h1>
            <button className="bg-black text-white text-sm px-2 py-0.5 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-red-400" >Add Product</button>
        </div>
        </div>
    )
}

export default Warehouse;