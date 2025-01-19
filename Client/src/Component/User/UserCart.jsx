import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/store';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/api/user/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { items, totalAmount } = response.data;

        const updatedItems = items.map(item => ({
          ...item,
          quantity: item.quantity || 1, // Default quantity
        }));

        setCartItems(updatedItems);
        setSubtotal(typeof totalAmount === 'number' ? totalAmount : 0);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart data:', err);
        setError('Failed to fetch cart data');
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const calculateSubtotal = (updatedItems) => {
    const total = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    setSubtotal(total);
  };

  const handleQuantityChange = async (id, increment) => {
    const updatedItems = cartItems.map(item =>
      item.product._id === id
        ? {
            ...item,
            quantity: Math.max(item.quantity + increment, 1),
          }
        : item
    );

    setCartItems(updatedItems);

    const updatedItem = updatedItems.find(item => item.product._id === id);

    try {
      await axios.put(
        'http://localhost:3000/api/user/cart',
        { quantity: updatedItem.quantity, productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      calculateSubtotal(updatedItems);
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id !== id)
      );

      calculateSubtotal(cartItems.filter((item) => item.product._id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-44 mb-36">
        <h1 className="text-gray-700 font-semibold text-lg">No items in your cart</h1>
        <p className="text-gray-500 text-sm mt-2">Start adding products to your cart now!</p>
        <button
          className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
          onClick={() => navigate('/shop')}
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="mt-24">
      {/* Cart UI */}
      <div className="pl-52 py-14">
        <div className="flex-none text-xs font-normal text-gray-700">
          Home &gt; <span className="text-gray-400"> Shopping Cart</span>
        </div>
        <div className="flex gap-14">
          <div className="w-[720px] min-h-[240px] max-h-max mt-20 border border-gray-200">
            <div className="flex px-10 py-4 gap-24 font-bold text-gray-700 border-b">
              <h1>PRODUCT</h1>
              <div className="flex justify-around gap-16 pl-16">
                <h1 className="ml-4">PRICE</h1>
                <h1>QUANTITY</h1>
                <h1>TOTAL</h1>
              </div>
            </div>
            {cartItems.map(item => (
              <div
                className="flex justify-between px-10 py-4 border-b items-center"
                key={item.product._id}
              >
                <div className="flex items-center gap-4">
                  <img
                    className="h-20 w-16"
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                  />
                  <h1 className="w-28">{item.product.name}</h1>
                </div>
                <h1 className="w-18">${item.product.price}</h1>
                <div className="flex items-center gap-2">
                  <button
                    className="border px-2"
                    onClick={() => handleQuantityChange(item.product._id, -1)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-8 text-center border"
                  />
                  <button
                    className="border px-2"
                    onClick={() => handleQuantityChange(item.product._id, 1)}
                  >
                    +
                  </button>
                </div>
                <h1>${(item.product.price * item.quantity).toFixed(2)}</h1>
                <MdDelete
                  onClick={() => handleDelete(item.product._id)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            ))}
          </div>
          {/* Right section for Cart Totals */}
        </div>
      </div>
    </div>
  );
}

export default UserCart;
