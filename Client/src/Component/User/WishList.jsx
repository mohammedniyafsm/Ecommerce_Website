import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useAuth } from '../../context/store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function WishList() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token){
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/user/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.items || []); // Safeguard against undefined
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setProducts([]); // Fallback in case of error
      }
    };

    fetchWishlist();
  }, [token]);

  return (
    <div>
        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-28">
        {products.map((item) => (
          <div className="relative group" key={item.product._id}>
            <div className="overflow-hidden">
              <img
                src={item.product.images[0].url} // Replace with actual item.product image path
                alt={item.product.name}
                className="w-[260px] h-[335px] object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <button
                onClick={() => handleQuickView(item.product._id)}
                className="absolute inset-0 mx-24 mt-72 bg-white text-gray-800 border h-10 rounded-3xl w-24 border-gray-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 hover:bg-black hover:text-white"
              >
                Quick View
              </button>
            </div>
            <div className="w-64 flex justify-between items-center mt-2">
              <h2 className="font-semibold">{item.product.name}</h2>
              <button className="text-gray-500 hover:text-red-500">
                <FaHeart />
              </button>
            </div>
            <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>   
    </div>
  )
}

export default WishList;
