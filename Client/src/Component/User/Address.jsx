import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useAuth } from "../../context/store";
import Navbar from "./Navbar";

function Address() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]); // Ensure it's initialized
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Fetch Addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/address", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data.addresses); // Debug API response

        if (response.data && Array.isArray(response.data)) {
            setAddresses(response.data[0].address || []);
        } else {
          setAddresses([]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error.message);
        setAddresses([]); // Prevent undefined issues
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  // Handle Delete Address
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/address/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(addresses.filter((addr) => addr._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };

  // Handle Edit Address (Navigate to edit page)
  const handleEdit = (address) => {
    navigate(`/edit-address/${address._id}`, { state: { address } });
  };

  // Handle Add Address (Navigate to add page)
  const handleAddAddress = () => {
    navigate("/addAddress");
  };

  return (
    <>
      <Navbar />
      <div className="pt-36 bg-gray-100 min-h-screen">
        <div className="flex gap-20">
          {/* Sidebar */}
          <div className="ml-44 bg-white h-80 w-80 shadow-md rounded-xl">
            <div className="flex px-4 py-4 items-center">
              <img
                className="rounded-full h-14"
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="Profile"
              />
              <h1 className="font-bold text-gray-700 ml-6">Mohammed Niyaf</h1>
              <ExpandMoreIcon className="ml-2" fontSize="small" />
            </div>
            <div className="font-sans mt-4">
              <h1 className="pl-10 px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/account")}>
                Profile Information
              </h1>
              <h1 className="pl-10 px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/address")}>
                Manage Address
              </h1>
              <h1 className="pl-10 px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/order")}>
                Order
              </h1>
              <h1 className="pl-10 px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/wallet")}>
                Wallet
              </h1>
              <h1 className="pl-10 px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/logout")}>
                Logout
              </h1>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white rounded-lg w-[750px] min-h-52 shadow-md p-6">
            <h1 className="text-blue-600 font-semibold">Manage Address</h1>

            {/* Add Address Button */}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={handleAddAddress}
            >
              Add Address
            </button>

            {loading ? (
              <p>Loading addresses...</p>
            ) : addresses.length > 0 ? (
              <div className="overflow-y-auto max-h-80 mt-4">
                {addresses.map((item) => (
                  <div className="flex gap-6 mb-4 p-4 border-b border-gray-200" key={item._id}>
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
                      <div className="flex gap-3 mt-2">
                        <button className="text-blue-500 cursor-pointer" onClick={() => handleEdit(item)}>
                          Edit Address
                        </button>
                        <button className="text-red-500 cursor-pointer" onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No addresses found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
