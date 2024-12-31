import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';

function Footer() {
  return (
    <div className="w-screen h-[450px] bg-neutral-800 mt-12">
      <div className="flex justify-between px-48 py-24">
        <div className="text-gray-400">
          <h1 className="font-bold text-white mb-5 text-base">CATEGORIES</h1>
          <div className="text-sm cursor-pointer">
            <p className="pb-2 hover:text-blue-500">Women</p>
            <p className="pb-2 hover:text-blue-500">Men</p>
            <p className="pb-2 hover:text-blue-500">Shoe</p>
            <p className="pb-2 hover:text-blue-500">Watches</p>
          </div>
        </div>

        <div className="text-gray-400">
          <h1 className="font-bold text-white mb-5 text-base">HELP</h1>
          <div className="text-sm cursor-pointer">
            <p className="pb-2 hover:text-blue-500">Track Order</p>
            <p className="pb-2 hover:text-blue-500">Returns</p>
            <p className="pb-2 hover:text-blue-500">Shipping</p>
            <p className="pb-2 hover:text-blue-500">FAQ'S</p>
          </div>
        </div>

        <div className="flex">
          <div className="text-gray-400">
            <h1 className="font-bold text-white mb-5 text-base">GET IN TOUCH</h1>
            <div className="text-sm">
              <p className="pb-2">Any questions? Let us know in store at 8th<br /> floor, 379 Hudson St, New York, NY 10018 or<br /> call us on (+1) 96 716 6879</p>
            </div>
            <div className="flex gap-4 mt-4">
              <p className="pb-2 hover:text-blue-500"><InstagramIcon /></p>
              <p className="pb-2 hover:text-blue-500"><FacebookIcon /></p>
              <p className="pb-2 hover:text-blue-500"><PinterestIcon /></p>
            </div>
          </div>
          
          <div className="text-gray-400 ml-8">
            <h1 className="font-bold text-white mb-5 text-base">NEWSLETTER</h1>
            <div className="text-sm cursor-pointer">
              <input className='bg-neutral-800' type="text" placeholder='email@example.com' /><br />
              <hr className='hover:first-line:blue-500' />
              <button className='bg-blue-600 h-12 w-40 mt-4 text-white font-semibold rounded-2xl'>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <p className="text-center text-sm text-gray-400">
          Copyright ©2024 All rights reserved | Made with by <span className='text-blue-400'>Colorlib</span> & distributed by <span className='text-blue-400'>MohammedNiyaf</span>
        </p>
      </div>
    </div>
  );
}

export default Footer;
