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
          quantity: item.quantity || 1,
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

  return (
    <div className="mt-24">
      {cartItems.length === 0 && (
        <div className="text-center mt-28 mb-64">
          <h2 className="text-2xl font-semibold">No items in your cart</h2>
          <p className="text-gray-500">Start adding products to your cart now!</p>
          <button
            className="mt-4 bg-black text-white px-6 py-2 rounded-lg"
            onClick={() => navigate('/shop')}
          >
            Go to Shop
          </button>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="pl-52 py-14">
          <div className="flex-none text-xs font-normal text-gray-700">
            <span className='cursor-pointer' onClick={ ()=>{navigate('/');}}>Home &gt;</span> <span className="text-gray-400"> Shopping Cart</span>
          </div>
          <div className="flex gap-14">
            <div className="w-[720px] min-h-[240px] max-h-max mt-20 border border-gray-200">
              <div className="flex px-10 py-4 gap-24 font-bold text-gray-700 border-b">
                <h1>PRODUCT</h1>
                <div className="flex justify-around gap-16 pl-16">
                  <h1 className="ml-4">PRICE</h1>
                  <h1 className=''>QUANTITY</h1>
                  <h1 className=''>TOTAL</h1>
                </div>
                <h1></h1>
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
                  <h1 className='w-18'>${item.product.price}</h1>
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
                  <MdDelete onClick={() => handleDelete(item.product._id)} className="cursor-pointer text-red-500" />
                </div>
              ))}
              <div className="px-10 py-4 flex justify-between">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border p-2 rounded-3xl"
                />
                <button className="bg-gray-200 p-2 rounded-3xl">APPLY COUPON</button>
                <button className="bg-gray-200 p-2 rounded-3xl">UPDATE CART</button>
              </div>
            </div>
            <div className="mt-20 w-[391px] h-[380px] border border-gray-200 p-4 px-10">
              <h2 className="font-bold text-gray-700 text-xl">CART TOTALS</h2>
              <div className="flex gap-8 my-8 items-center">
                <span className="text-lg">Bag Total:</span>
                <span className="text-xl">${subtotal.toFixed(2)}</span>
              </div>
              <div className="">   
                <div className=" flex gap-40 my-0 items-center">
                <h1>Bag Savings:</h1>
                <h1>$00.0</h1>
                </div>           
                <div className=" flex gap-32 mt-2 items-center">
                <h1>Coupon  Savings:</h1>
                <h1>$00.0</h1>
                </div>           
              </div>
              <div className="flex justify-between mt-20">
                <span>Amount Payable:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button onClick={()=>{navigate('/checkout')}} className="bg-black text-white p-2 w-full mt-4 rounded-3xl">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCart;
