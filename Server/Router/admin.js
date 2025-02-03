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

const {
    protect,
    isAdmin
} = require('../Middleware/AuthMiddleware');

const {
    getAllOrders,
    updateOrderStatus,
} = require('../Controller/orderController');

const uploadMiddleware = require("../Middleware/uploadMiddleware");
const upload = uploadMiddleware("Categories");


//Category Operations

router.route('/addCategory').post(upload.single("image"),protect,isAdmin,addCategory);// Add a new category
router.route('/categories').get(protect,isAdmin,getCategories);// Get all categories
router.route('/categories/:id').put(protect,isAdmin,updateCategory);// Update a category by ID
router.route('/categories/:id').delete(protect,isAdmin,deleteCategory);// Delete a category by ID


//Product operation
router.route('/addProduct').post(upload.array("images",4),protect, isAdmin,addProduct);// Adding product
router.route('/product').get(protect,isAdmin,getProduct);// Adding product


router.route('/orders').get(protect, isAdmin, getAllOrders);
router.route('/order/update').put(protect, isAdmin, updateOrderStatus);



module.exports = router;
