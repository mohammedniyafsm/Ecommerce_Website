import React, { useState, useEffect } from 'react';
import { FaFilter, FaSearch, FaHeart, FaRegHeart } from 'react-icons/fa'; // Include outline heart icon
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve token

  const navigate = useNavigate();


  const categories = ['All Products', 'Women', 'Men', 'Bags', 'Shoes', 'Watches'];

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchProducts = async (category) => {
    try {
      const endpoint =
        category === 'All Products'
          ? 'http://localhost:3000/api/user/allProduct'
          : `http://localhost:3000/api/user/product/${category}`;
      const response = await axios.get(endpoint);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(response.data.items.map((item) => item.product._id));
    } catch (error) {
      console.error('Error fetching wishlist:', error.message);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const isWishlisted = wishlist.includes(productId);
      const method = isWishlisted ? 'delete' : 'post';
      const endpoint = `http://localhost:3000/api/user/wishlist/${productId}`;
      
      await axios({
        method,
        url: endpoint,
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setWishlist((prev) =>
        isWishlisted ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    } catch (error) {
      console.error(`Error toggling wishlist: ${error.message}`);
    }
  };


  const loadMoreProducts = () => setVisibleCount((prevCount) => prevCount + 16);

  const handleQuickView = (productId) => navigate(`/productView/${productId}`);

  return (
    <div className="w-screen min-h-screen px-44 mt-36">
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
                src={product.images[0].url}
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
            <div className="w-64 flex justify-between items-center mt-2">
              <h2 className="font-semibold">{product.name}</h2>
              <button
                className="text-gray-500 hover:text-red-500"
                onClick={() => toggleWishlist(product._id)}
              >
                {wishlist.includes(product._id) ? <FaHeart /> : <FaRegHeart />}
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
};

export default AllProduct;
