import React, { useState } from 'react';
import { FaFilter, FaSearch, FaHeart } from 'react-icons/fa'; // Ensure you have react-icons installed
import { pic } from '../../assests/assests';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ['All Products', 'Women', 'Men', 'Bags', 'Shoes', 'Watches'];
  const products = [
    { name: 'Esprit Ruffle Shirt', price: 16.64, image: pic.d1 },
    { name: 'Herschel Supply', price: 35.31, image: pic.d1 },
    { name: 'Only Check Trouser', price: 25.50, image: pic.d1 },
    { name: 'Classic Trench Coat', price: 75.00, image: pic.d1 },
    { name: 'Esprit Ruffle Shirt', price: 16.64, image: pic.d1 },
    { name: 'Herschel Supply', price: 35.31, image: pic.d1 },
    { name: 'Only Check Trouser', price: 25.50, image: pic.d1 },
    { name: 'Classic Trench Coat', price: 75.00, image: pic.d1 },
  ];

  const loadMoreProducts = () => {
    setVisibleCount(prevCount => prevCount + 16);
  };

  const handleQuickView = () => {
    navigate('/productView');
  };

  return (
    <div className='w-screen min-h-screen px-44 mt-14'>
      <div className="">
        <h1 className='font-bold text-4xl text-neutral-800'>PRODUCT OVERVIEW</h1>
      </div>
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-8">
          {categories.map(category => (
            <h1
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer text-gray-400 hover:text-gray-900 ${selectedCategory === category ? 'text-neutral-800 border-b-2 border-neutral-800' : ''}`}
            >
              {category}
            </h1>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-500 hover:text-white">
            <FaFilter className="hover:text-white" /> Filter
          </button>
          <button className="border border-gray-300 text-gray-500 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-500 hover:text-white">
            <FaSearch className="hover:text-white" /> Search
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pl-4">
        {products.slice(0, visibleCount).map((product, index) => (
          <div className="relative group" key={index}>
            <div className="overflow-hidden">
              <img
                src={product.image} // Replace with actual product image path
                alt={product.name}
                className="w-[260px] h-[335px] object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <button
                onClick={handleQuickView}
                className="absolute inset-0 mx-24 mt-72 bg-white text-gray-800 border h-10 rounded-3xl w-24 border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 hover:bg-black hover:text-white"
              >
                Quick View
              </button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <h2 className="font-semibold">{product.name}</h2>
              <button className="text-gray-500 hover:text-red-500">
                <FaHeart />
              </button>
            </div>
            <p className="text-gray-500">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center my-28">
          <button
            onClick={loadMoreProducts}
            className="bg-gray-200 text-black px-6 py-3 rounded-3xl font-medium w-48 hover:bg-black hover:text-white"
          >
            LOAD MORE
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
