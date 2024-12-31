const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    uppercase: true,
    unique: true,
  },
  image: {
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
