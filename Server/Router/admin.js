const express = require('express');
const router = express.Router();
const { 
    addCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
} = require('../Controller/categoryController');

const {
    addProduct,
    getProduct
} = require('../Controller/productController');

const uploadMiddleware = require("../Middleware/uploadMiddleware");
const upload = uploadMiddleware("Categories");


//Category Operations

router.route('/addCategory').post(upload.single("image"),addCategory);// Add a new category
router.route('/categories').get(getCategories);// Get all categories
router.route('/categories/:id').put(updateCategory);// Update a category by ID
router.route('/categories/:id').delete(deleteCategory);// Delete a category by ID


//Product operation
router.route('/addProduct').post(upload.array("images",4),addProduct);// Adding product
router.route('/product').get(getProduct);// Adding product



module.exports = router;
