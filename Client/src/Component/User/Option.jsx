import React from 'react';
import { pic } from '../../assests/assests';

function Option() {
  return (
    <div className='w-screen h-96 flex items-center justify-center gap-12 px-44 pt-20'>
      <div className="relative flex w-[365px] h-60 border border-gray-200  cursor-pointer overflow-hidden group">
        <div className='pt-8 pl-10 z-10'>
          <h1 className='text-3xl font-bold text-gray-800 group-hover:text-white'>Women</h1>
          <h2 className='text-sm font-medium text-gray-500 mt-2 group-hover:text-white'>Spring 2025</h2>
          <p className='mt-8 text-lg font-semibold text-white underline hidden group-hover:block group-hover:animate-pop-up'>Shop Now</p>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
        <div className='absolute top-0 left-10 w-full h-full flex items-center justify-center'>
          <img className='h-full w-full object-cover object-center' src={pic.women1} alt="Women" />
        </div>
      </div>
      <div className="relative flex w-[365px] h-60 border border-gray-200  cursor-pointer overflow-hidden group">
        <div className='pt-8 pl-10 z-10'>
          <h1 className='text-3xl font-bold text-gray-800 group-hover:text-white'>Men</h1>
          <h2 className='text-sm font-medium text-gray-500 mt-2 group-hover:text-white'>Spring 2025</h2>
          <p className='mt-8 text-lg font-semibold text-white underline hidden group-hover:block group-hover:animate-pop-up'>Shop Now</p>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
        <div className='absolute top-0 left-10 w-full h-full flex items-center justify-center'>
          <img className='h-full w-full object-cover object-center' src={pic.men1} alt="Men" />
        </div>
      </div>
      <div className="relative flex w-[365px] h-60 border border-gray-200  cursor-pointer overflow-hidden group">
        <div className='pt-8 pl-10 z-10'>
          <h1 className='text-3xl font-bold text-gray-800 group-hover:text-white'>Accessories</h1>
          <h2 className='text-sm font-medium text-gray-500 mt-2 group-hover:text-white'>New Trend</h2>
          <p className='mt-8 text-lg font-semibold text-white underline hidden group-hover:block group-hover:animate-pop-up'>Shop Now</p>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-blue-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
        <div className='absolute top-5 left-8 w-full h-full flex items-center justify-center'>
          <img className='h-full w-full object-cover object-center' src={pic.cap} alt="Accessories" />
        </div>
      </div>
    </div>
  );
}

export default Option;
