import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch, FaHeart } from 'react-icons/fa'; // Ensure you have react-icons installed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AllProduct() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ['All Products', 'Women', 'Men', 'Bags', 'Shoes', 'Watches'];

  // Fetch products from the backend
  const fetchProducts = async (category) => {
    try {
      let response;
      if (category === 'All Products') {
        response = await axios.get('http://localhost:3000/api/user/allProduct'); // Fetch all products
        console.log("response",response);
        
      } else {
        response = await axios.get(`http://localhost:3000/api/user/product/${category}`); // Fetch products by category
      }
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  // Handle category change
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const loadMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 16);
  };

  const handleQuickView = (productId) => {
    navigate(`/productView/${productId}`); // Navigate to product details page
  };

  return (
    <div className="w-screen min-h-screen px-44 mt-36">
      {/* <div className="">
        <h1 className="font-bold text-4xl text-neutral-800">PRODUCT OVERVIEW</h1>
      </div> */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-8">
          {categories.map((category) => (
            <h1
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer text-gray-400 hover:text-gray-900 ${
                selectedCategory === category ? 'text-neutral-800 border-b-2 border-neutral-800' : ''
              }`}
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
        {products.slice(0, visibleCount).map((product) => (
          <div className="relative group" key={product._id}>
            <div className="overflow-hidden">
              <img
                src={product.images[0].url} // Replace with actual product image path
                alt={product.name}
                className="w-[260px] h-[335px] object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <button
                onClick={() => handleQuickView(product._id)}
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

export default AllProduct;
