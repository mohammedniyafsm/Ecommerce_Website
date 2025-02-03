import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAuth } from "../../context/store";

function Account() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const UserDetail = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/userDetail', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);

        setUserDetails({
          username: response.data.user.username,
          email: response.data.user.email,
          phone: response.data.user.phone,
        });
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };
    UserDetail();
  }, [token]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/userDetail",
        userDetails, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Updated user details:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error.message);
    }
  };

  return (
    <div className="pt-36 bg-gray-100 min-h-screen">
      <div className="flex gap-20">
        <div className="ml-44 bg-white h-80 w-80 shadow-md rounded-xl">
          <div className="flex px-4 py-4 items-center">
            <img
              className="rounded-full h-14"
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              alt=""
            />
            <h1 className="font-bold text-gray-700 ml-6">Mohammed Niyaf</h1>
            <ExpandMoreIcon className="ml-2" fontSize="small" />
          </div>
          <div className="font-sans mt-4">
            <h1
              className="pl-10 items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/account")}
            >
              Profile Information
            </h1>
            <h1
              className="pl-10 items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/address")}
            >
              Manage Address
            </h1>
            <h1
              className="pl-10 items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/order")}
            >
              Order
            </h1>
            <h1
              className="pl-10 items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/wallet")}
            >
              Wallet
            </h1>
            <h1
              className="pl-10 items-center justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate("/logout")}
            >
              Logout
            </h1>
          </div>
        </div>
        <div className="bg-white rounded-lg w-[750px] min-h-52 shadow-md">
          <div className="pl-12 pt-6">
            <h1 className="text-blue-600 font-semibold">Personal Details</h1>
            <div className="mt-6">
              <div className="items-center mb-4">
                <label className="w-40 font-medium">Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-80"
                  />
                ) : (
                  <span className="pl-2">{userDetails.username}</span>
                )}
              </div>
              <div className="items-center mb-4">
                <label className="w-40 font-medium">Email:</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-80"
                  />
                ) : (
                  <span className="pl-2">{userDetails.email}</span>
                )}
              </div>
              <div className="items-center mb-4">
                <label className="w-40 font-medium">Phone:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-80"
                  />
                ) : (
                  <span className="pl-2">{userDetails.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleEditToggle}
                  className={`rounded-xl flex items-center gap-1 ${
                    isEditing
                      ? "bg-red-500 text-white px-4 py-2"
                      : "bg-blue-500 text-white px-4 py-2"
                  }`}
                >
                  {isEditing ? "Cancel" : "Edit"}
                  <EditIcon className="ml-1" fontSize="small" />
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
