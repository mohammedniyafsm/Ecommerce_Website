const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category =require('./categorySchema');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category', // Ensure the model name matches exactly
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,  
          },
      altText: {
        type: String,
      },
      caption: {
        type: String,
      },
    },
  ],
  active: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
