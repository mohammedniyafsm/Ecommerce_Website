import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Arrow icon for expand


function Customer() {
  return (
    <div className="px-2 py-2">
    <div className="bg-white min-h-[650px] w-[1200px] rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between px-8 py-4 h-18 items-center border-b border-gray-300">
        <div className="font-semibold text-xl w-52">
          <h1>Product List</h1>
        </div>
        <div className="space-x-2 flex">
          <button className="rounded-md bg-white border text-sm border-gray-300 text-gray-500 h-8 w-20 hover:bg-gray-100 ">
            <FilterAltOutlinedIcon className="text-gray-500" />
            <span>Filter</span>
          </button>
          <button className="rounded-md bg-gray-300 text-sm border border-gray-300 text-gray-500 h-8 w-16 hover:bg-white">
            See All
          </button>
          <button className="rounded-md bg-blue-700 text-white h-8 w-32 text-sm ">
            <AddOutlinedIcon className="text-xs" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      

     
      {/* product detail */}
      <div className="flex space-x-4 px-2 py-4 items-center text-gray-600 border-b border-gray-300 ">
        <div className="flex space-x-4 ml-4 mr-32">
         <img src="https://www.snitch.co.in/cdn/shop/files/8494d6584d12836d393cf5a7b72a89d6.jpg?v=1727764468&width=1800" alt="" className="h-18 w-12" />
         <span className="text-sm pt-6">Shirt</span>  
        </div>  

        <div className="grid grid-cols-4 space-x-10 w-[800px]">
         <h1 className="text-sm ">Women</h1>
         <h1 className="text-sm">$100</h1>
         <h1 className="text-sm pl-11">90</h1>
         <h1 className="text-sm pl-16">Available</h1>
        </div>
      </div>

      
    </div>
  </div>
  )
}

export default Customer;
