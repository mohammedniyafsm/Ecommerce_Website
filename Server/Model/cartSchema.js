const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },

    // Array of items in the cart
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product', // Referencing the Product schema
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1, // Default to 1 if no quantity specified
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      default: 0, 
    },

    dateCreated: {
      type: Date,
      default: Date.now, 
    },
  },
  {
    timestamps: true, 
  }
);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
