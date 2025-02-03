const Order = require('../Model/orderSchema');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});


// ✅ Create Order (User Places Order)
const createOrder = async (req, res) => {
    const { totalAmount, address, paymentMethod, items } = req.body;
    const userId = req.user._id;

    try {
        console.log("Request Body:", req.body);

        // Create Razorpay order (for online payments)
        const options = {
            amount: totalAmount * 100, // Convert to smallest currency unit
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };
        const razorpayOrder = await razorpay.orders.create(options);

        // Save order details in MongoDB
        const newOrder = new Order({
            userId,
            items,
            address,
            totalAmount,
            PaymentMethod: paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "processing",
            orderStatus: 'pending',
            deliveryStatus: 'pending',
            createdAt: Date.now(),
        });

        await newOrder.save();

        res.status(200).json({
            razorpayOrder,
            orderId: newOrder._id, 
        });
    } catch (err) {
        console.error('Order creation failed:', err);
        res.status(500).json({ message: 'Order creation failed', error: err.message });
    }
};


// ✅ Verify Payment (Razorpay Signature Verification)
const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature === expectedSign) {
            // Update the order's payment status in MongoDB
            await Order.findByIdAndUpdate(orderId, {
                paymentStatus: 'completed',
                verify: true,
                totalPaid: true,
            });

            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ✅ Get Orders for a User (User Dashboard)
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// ✅ Cancel Order (Only If Not Delivered)
const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.orderStatus === "delivered") {
            return res.status(400).json({ error: 'Delivered orders cannot be canceled' });
        }

        order.orderStatus = "canceled";
        order.canceled = true;
        order.paymentStatus = order.PaymentMethod === "COD" ? "pending" : "refund_initiated";

        await order.save();
        res.status(200).json({ message: 'Order canceled successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ✅ Get All Orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({ message: 'No orders found.' });
        }

        res.status(200).json({
            orders: orders,
            totalOrders: orders.length, 
        });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Server error while fetching orders' });
    }
};


// ✅ Update Order Status (Admin Panel)
const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Validate order status transition
        const validTransitions = {
            pending: ["packed", "canceled"],
            packed: ["shipped"],
            shipped: ["delivered"],
        };

        if (!validTransitions[order.orderStatus]?.includes(status)) {
            return res.status(400).json({ error: `Invalid status transition: ${order.orderStatus} → ${status}` });
        }

        order.orderStatus = status;
        if (status === "delivered") {
            order.deliveryStatus = "delivered";
            order.deliveredAt = Date.now();
        }

        await order.save();
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createOrder,
    verifyOrder,
    getUserOrders,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
};
