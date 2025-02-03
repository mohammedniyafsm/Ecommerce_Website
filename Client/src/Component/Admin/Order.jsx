import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/store";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Order() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        // ✅ No need to sort in frontend (already sorted in backend)
        const orderData = Array.isArray(response.data.orders) ? response.data.orders : [];

        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [token]);

  // ✅ Update Order Status (Admin Action)
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/order/update",
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );

      console.log("Updated Order:", response.data);
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="bg-white min-h-[650px] w-[1200px] rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex justify-between px-8 py-4 items-center border-b border-gray-300">
          <h1 className="font-semibold text-xl">Admin Order Management</h1>
          <div className="space-x-2 flex">
            <button className="rounded-md bg-white border text-sm border-gray-300 text-gray-500 h-8 px-4 hover:bg-gray-100 flex items-center gap-2">
              <FilterAltOutlinedIcon className="text-gray-500" />
              Filter
            </button>
            <button className="rounded-md bg-gray-300 text-sm border border-gray-300 text-gray-500 h-8 px-4 hover:bg-white">
              See All
            </button>
            <button className="rounded-md bg-blue-700 text-white h-8 px-4 text-sm flex items-center gap-2">
              <AddOutlinedIcon className="text-xs" />
              Add Order
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto max-h-[550px]">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="flex flex-col space-y-4 p-4 border-b border-gray-300">
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-gray-700 font-semibold">Order ID: {order._id}</h2>
                    <p className="text-gray-500 text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-500 text-sm">Total Amount: ${order.totalAmount}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full text-white capitalize ${
                    order.orderStatus === "pending" ? "bg-yellow-500"
                    : order.orderStatus === "packed" ? "bg-blue-500"
                    : order.orderStatus === "shipped" ? "bg-purple-500"
                    : order.orderStatus === "delivered" ? "bg-green-500"
                    : "bg-red-500"
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-3 gap-6 bg-gray-50 p-3 rounded-md">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 border p-2 bg-white rounded-md shadow-sm">
                      <img
                        src={item.images || "https://via.placeholder.com/50"}
                        alt={item.name || "Product"}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="text-gray-700 font-medium">{item.name || "Product Name"}</h3>
                        <p className="text-gray-500 text-sm">Category: {item.category || "N/A"}</p>
                        <p className="text-gray-500 text-sm">Price: ${item.price || "0"}</p>
                        <p className="text-gray-500 text-sm">Quantity: {item.quantity || "N/A"}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Action Buttons */}
                <div className="flex justify-end gap-4">
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "packed")}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Mark as Packed
                    </button>
                  )}
                  {order.orderStatus === "packed" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "shipped")}
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                    >
                      Mark as Shipped
                    </button>
                  )}
                  {order.orderStatus === "shipped" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "delivered")}
                      className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  )}
                  {order.orderStatus !== "canceled" && order.orderStatus !== "delivered" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "canceled")}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-6">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
