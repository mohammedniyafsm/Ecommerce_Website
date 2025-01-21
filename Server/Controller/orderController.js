const Order = require('../MODEL/orderSchema');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  const { totalAmount, address, paymentMethod, items ,userId} = req.body;

  try {
      // Create Razorpay order
      const options = {
          amount: totalAmount, // smallest currency unit
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
          paymentStatus: 'pending',  // Initial payment status
          orderStatus: 'pending',
          deliveryStatus: 'pending',
          createdAt: Date.now(),
      });
      
      await newOrder.save();

      res.status(200).json({
          razorpayOrder,
          orderId: newOrder._id,  // Pass MongoDB order ID for later updates
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


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
              deliveredAt: Date.now()
          });

          res.status(200).json({ message: 'Payment verified successfully' });
      } else {
          res.status(400).json({ error: 'Invalid payment signature' });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};




const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Extract `userId` from the decoded token (protect middleware)
        
        const orders = await Order.find({ userId }); // Fetch orders where userId matches
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user.' });
        }
        
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus: 'Cancelled' },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();  

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }
    res.status(200).json({
      orders: orders,
      totalOrders: orders.length,  // Optional: Include total order count
    });
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};


const updateOrderStatus = async (req, res) => {
    const { orderId, status, deliveryAt } = req.body;  // Destructure deliveryAt as well

    try {
        // Update order with new status and delivery date (if provided)
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { 
                orderStatus: status,           // Update the order status
                deliveredAt: deliveryAt || null // Update the deliveryAt date if provided, else set it to null
            },
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: 'Order status and delivery date updated', order: updatedOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






module.exports = { createOrder, verifyOrder, updateOrderStatus,getUserOrders,getAllOrders };


