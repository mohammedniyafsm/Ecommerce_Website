import React from 'react';
import { pic } from '../../assests/assests'; // Ensure the path to your images is correct

function ProductView() {
  return (
    <div className="mt-28 px-52 py-14">
      <div className="flex gap-10">
        {/* Left side images */}
        <div className="flex flex-col gap-4">
          <img className="w-20 h-20 border" src={pic.d1} alt="View 1" />
          <img className="w-20 h-20 border" src={pic.d2} alt="View 2" />
          <img className="w-20 h-20 border" src={pic.d3} alt="View 3" />
        </div>

        {/* Main product image */}
        <div className="">
          <img className="w-[452px] h-[452px]" src={pic.d1} alt="Main View" />
        </div>

        {/* Product details */}
        <div className="w-1/3">
          <h1 className="text-2xl font-bold">Lightweight Jacket</h1>
          <p className="text-lg font-semibold text-gray-700">$58.79</p>
          <p className="mt-4 text-sm text-gray-500">
            Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Size:</label>
            <select className="border p-2 w-full mt-2">
              <option>Select size</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Color:</label>
            <select className="border p-2 w-full mt-2">
              <option>Select color</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button className="border px-2">-</button>
            <input type="text" value="1" className="w-12 text-center border" />
            <button className="border px-2">+</button>
          </div>
          <button className="mt-4 bg-black text-white p-2 w-full">ADD TO CART</button>
          <div className="mt-4 flex gap-2">
            <button className="border p-2 w-full">Share</button>
            <button className="border p-2 w-full">Like</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default ProductView;
