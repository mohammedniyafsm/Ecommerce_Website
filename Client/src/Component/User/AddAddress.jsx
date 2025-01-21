import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/store';

function AddAddress() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    addressDetail: '',
    landmark: '',
    state: '',
    zip: '',
    phone: ''
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/user/address', address, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-8 bg-white shadow-md rounded-md mt-48">
      <h2 className="text-2xl font-bold mb-6">Add Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={address.firstName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={address.lastName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="addressDetail"
            placeholder="Address Detail"
            value={address.addressDetail}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={address.landmark}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4 grid grid-cols-3 gap-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip"
            value={address.zip}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={address.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={() => navigate('/checkout')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
