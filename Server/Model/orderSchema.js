const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        images: { type: String, required: true },
        subCategory: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      landmark: { type: String },
      addressDetail: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: Number, required: true },
      phone: { type: String, required: true, match: /^[0-9]{10}$/ }, // Validation for 10-digit phone numbers
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPaid: {
      type: Number,
      default: 0, // Default to unpaid
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'Cash on Delivery', 'UPI', 'Net Banking'],
    },
    deliveryStatus: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processed', 'completed', 'cancelled'],
      default: 'pending',
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    returned: {
      type: Boolean,
      default: false,
    },
    returnApproval: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
