import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/store';

function CheckoutPayment() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [cartItems, setCartItems] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/address', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data[0].address || []);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items);
        setCartTotalAmount(response.data.totalAmount);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchAddresses();
    fetchCartData();
  }, [token]);

  const handleEdit = (address) => {
    setEditAddress(address);
    setIsEditMode(true);
  };

  const handleSave = async (updatedAddress) => {
    try {
      await axios.put(
        `http://localhost:3000/api/user/address/${editAddress._id}`,
        updatedAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAddresses((prev) =>
        prev.map((addr) =>
          addr._id === editAddress._id ? { ...addr, ...updatedAddress } : addr
        )
      );
      setIsEditMode(false);
      setEditAddress(null);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div className="px-20 pt-36">
      <h2 className="font-sans text-lg">Checkout</h2>
      <div>
        {isEditMode ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">Edit Address</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedAddress = Object.fromEntries(formData);
                handleSave(updatedAddress);
              }}
              className="space-y-4"
            >
              <input
                name="firstName"
                defaultValue={editAddress.firstName}
                className="block w-full p-3 border rounded-md"
                placeholder="First Name"
              />
              <input
                name="lastName"
                defaultValue={editAddress.lastName}
                className="block w-full p-3 border rounded-md"
                placeholder="Last Name"
              />
              <input
                name="phone"
                defaultValue={editAddress.phone}
                className="block w-full p-3 border rounded-md"
                placeholder="Phone"
              />
              <input
                name="addressDetail"
                defaultValue={editAddress.addressDetail}
                className="block w-full p-3 border rounded-md"
                placeholder="Address Detail"
              />
              <input
                name="landmark"
                defaultValue={editAddress.landmark}
                className="block w-full p-3 border rounded-md"
                placeholder="Landmark"
              />
              <input
                name="state"
                defaultValue={editAddress.state}
                className="block w-full p-3 border rounded-md"
                placeholder="State"
              />
              <input
                name="zip"
                defaultValue={editAddress.zip}
                className="block w-full p-3 border rounded-md"
                placeholder="Zip Code"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded-md shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="w-[750px]">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600 font-mono">Shipping details</p>
                <p
                  className="font-sans text-blue-500 cursor-pointer"
                  onClick={() => navigate('/addAddress')}
                >
                  <strong>+ </strong> Add new address
                </p>
              </div>
              <hr className="w-full mb-4" />
              <div className="overflow-y-auto max-h-80">
                {addresses.length > 0 ? (
                  addresses.map((item) => (
                    <div className="flex gap-6 mb-4" key={item._id}>
                      <input
                        type="radio"
                        name="address"
                        onChange={() => setSelectedAddress(item)}
                      />
                      <div>
                        <p className="text-sm">
                          {item.firstName} {item.lastName} <br />
                          {item.phone} <br />
                          {item.addressDetail} <br />
                          {item.landmark} <br />
                          {item.state} <br />
                          {item.zip}
                        </p>
                        <div className="flex gap-3">
                          <p
                            className="text-blue-500 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          >
                            Edit Address
                          </p>
                          <p
                            className="text-red-500 cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No addresses available.</p>
                )}
              </div>
            </div>
            <div className="mt-28 w-[450px] h-[250px] bg-gray-100 p-4 rounded-md shadow-md">
              <p className="font-sans">Payment Details:</p>
              <div className="mt-2">
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setPaymentMethod('COD')}
                />
                <label className="pl-3">Cash on Delivery</label>
              </div>
              <div className="mt-2">
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setPaymentMethod('RazorPay')}
                />
                <label className="pl-3">RazorPay</label>
              </div>
              <div className="flex justify-between mt-4">
                <p className="font-sans">Order Total</p>
                <p>Rs. {cartTotalAmount}</p>
              </div>
              <button
                type="button"
                className="btn btn-dark w-full mt-4 bg-black text-white py-2 rounded-md shadow-md"
              >
                Purchase Rs. {cartTotalAmount}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPayment;
