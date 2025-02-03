import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useAuth } from "../../context/store";
import Navbar from "./Navbar";

function Order() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("open"); // Default to Open Orders
  const [orders, setOrders] = useState([]); // Orders array

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/order/user-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [token]);


  // ✅ Filter orders based on selectedTab
  const filteredOrders = orders.filter((order) => {
    if (selectedTab === "open") {
      return (
        order.orderStatus === "pending" ||
        order.orderStatus === "packed" ||
        order.orderStatus === "shipped" ||
        order.orderStatus === "delivered"
      );
    } else if (selectedTab === "return") {
      return order.returned === true;
    } else if (selectedTab === "canceled") {
      return order.canceled === true;
    }
    return false;
  });

  // ✅ Cancel Order Function
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/order/cancel",
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Cancel Order Response:", response.data);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "canceled", canceled: true } : order
        )
      );
    } catch (error) {
      console.error("Error canceling order:", error.message);
    }
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
                alt=""
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

          {/* Order Section */}
          <div className="bg-white rounded-lg w-[750px] min-h-52 shadow-md">
            <div className="pl-12 pt-6">
              <h1 className="text-blue-600 font-semibold">Order Details</h1>

              {/* Tabs for Orders */}
              <div className="flex gap-6 mt-4 border-b pb-2">
                <button
                  className={`px-4 py-2 ${
                    selectedTab === "open" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                  }`}
                  onClick={() => setSelectedTab("open")}
                >
                  Open Orders
                </button>
                <button
                  className={`px-4 py-2 ${
                    selectedTab === "return" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                  }`}
                  onClick={() => setSelectedTab("return")}
                >
                  Return Orders
                </button>
                <button
                  className={`px-4 py-2 ${
                    selectedTab === "canceled" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                  }`}
                  onClick={() => setSelectedTab("canceled")}
                >
                  Canceled Orders
                </button>
              </div>

              {/* Order List */}
              <div className="overflow-y-auto max-h-80 mt-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div key={order._id} className="border-b py-4 px-6">
                      <h2 className="text-gray-700 font-semibold">Order ID: {order._id}</h2>
                      <p className="text-gray-500 text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-500 text-sm">Total Amount: ${order.totalAmount}</p>

                      {/* Order Status */}
                      <p
                        className={`text-sm font-semibold ${
                          order.canceled
                            ? "text-red-500"
                            : order.returned
                            ? "text-yellow-500"
                            : order.orderStatus === "delivered"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        {order.canceled
                          ? "Order Canceled"
                          : order.returned
                          ? "Order Returned"
                          : order.orderStatus === "shipped"
                          ? "Shipped"
                          : order.orderStatus === "packed"
                          ? "Packed"
                          : order.orderStatus === "pending"
                          ? "Pending"
                          : "Delivered"}
                      </p>

                      {/* Show all products in an order */}
                      <div className="mt-4 space-y-4">
                        {order.items.map((item) => (
                          <div key={item._id} className="flex items-center gap-4 border p-3 rounded-lg shadow-sm">
                            <img src={item.images} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                            <div>
                              <h3 className="text-gray-700 font-medium">{item.name}</h3>
                              <p className="text-gray-500 text-sm">Price: ${item.price}</p>
                              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cancel Order Button */}
                      {order.orderStatus === "pending" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 mt-4 text-center">No {selectedTab} orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
