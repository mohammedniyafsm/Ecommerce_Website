import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/store';

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { items, totalAmount } = response.data;

        // Initialize cart items with quantities
        const updatedItems = items.map(item => ({
          ...item,
          quantity: item.quantity || 1, // Set default quantity if not provided
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

  const handleQuantityChange = (id, increment) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product._id === id
          ? {
              ...item,
              quantity: Math.max(item.quantity + increment, 1), // Ensure quantity is at least 1
            }
          : item
      )
    );
  };

  const calculateSubtotal = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
    setSubtotal(total);
  };

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-24">
      <div className="pl-52 py-14">
        <div className="flex-none text-xs font-normal text-gray-700">
          Home &gt; <span className="text-gray-400"> Shopping Cart</span>
        </div>
        <div className="flex gap-14">
          <div className="w-[720px] min-h-[240px] max-h-max mt-20 border border-gray-200">
            <div className="flex px-10 py-4 gap-24 font-bold text-gray-700 border-b">
              <h1>PRODUCT</h1>
              <h1 className="ml-24">PRICE</h1>
              <h1>QUANTITY</h1>
              <h1>TOTAL</h1>
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
                  <h1 className="">{item.product.name}</h1>
                </div>
                <h1>${item.product.price}</h1>
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
          <div className="mt-20 w-[391px] h-[540px] border border-gray-200 p-4 px-10">
            <h2 className="font-bold text-gray-700 text-xl">CART TOTALS</h2>
            <div className="flex gap-8 my-8 items-center ">
              <span className="text-lg">Subtotal:</span>
              <span className="text-xl ">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-sm">
              <div className="flex gap-10">
                <h1 className="text-base font-bold text-gray-900">Shipping :</h1>
                <p className="">
                  There are no shipping <br /> methods available. <br /> Please
                  double check your <br />
                  address, or contact us if <br /> you need any help.
                </p>
              </div>
              <div className="mt-4">
                <select className="border p-2 w-full">
                  <option>Select a country...</option>
                </select>
                <input
                  type="text"
                  placeholder="State / country"
                  className="border p-2 w-full mt-2"
                />
                <input
                  type="text"
                  placeholder="Postcode / Zip"
                  className="border p-2 w-full mt-2"
                />
                <button className="bg-gray-200 p-2 w-full mt-2">
                  UPDATE TOTALS
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="bg-black text-white p-2 w-full mt-4 rounded-3xl">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCart;
