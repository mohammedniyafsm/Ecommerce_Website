const express = require('express');
const router = express.Router();
const {
    Signup,
    verifyOtp,
    Login,
    getUserDetails,
    updateUser,
} = require('../Controller/userController');
const {
    allProduct,
    productLoad,
    productSingleView,
} = require('../Controller/productController');
const {
    getCart,
    addToCart,
    deleteCartItem,
    updateCart,
} = require('../Controller/cartController');
const {
    productAddToWishlist,
    removeWishlistProduct,
    getWishlist,
} = require('../Controller/wishListController');
const {
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress
} = require('../Controller/addressController'); 
const {
    createOrder,
    verifyOrder,
    getUserOrders,
} = require('../Controller/orderController'); 

const { protect } = require('../Middleware/AuthMiddleware');


// User routes
router.route('/signup').post(Signup); // Create Account
router.route('/login').post(Login); // Login Account 
router.route('/verifyOtp').post(verifyOtp); // OTP Verification
router.route('/userDetail').get(protect,getUserDetails); // User Details
router.route('/userDetail').put(protect,updateUser ); // User update Details

// Product routes
router.route('/allProduct').get(allProduct); // Getting ALL Products
router.route('/product/:categoryName').get(productLoad); // Rendering Products According to Category
router.route('/productView/:id').get(productSingleView);  // Rendering Details of a Single Product

// Cart routes
router.route('/cart').get(protect, getCart); // Getting Cart
router.route('/cart').post(protect, addToCart); // Adding to Cart
router.route('/cart/:productId').delete(protect, deleteCartItem); // Deleting Cart Item
router.route('/cart').put(protect, updateCart); // Updating Cart

// Wishlist routes
router.route('/wishlist').get(protect, getWishlist); // Getting Wishlist
router.route('/wishlist/:id').post(protect, productAddToWishlist); // Adding Product to Wishlist
router.route('/wishlist/:id').delete(protect, removeWishlistProduct); // Removing Product from Wishlist

// Address routes
router.route('/address').get(protect, getAddress); // Get All Addresses for a User
router.route('/address').post(protect, addAddress); // Add Address
router.route('/address/:id').put(protect, updateAddress); // Update Address
router.route('/address/:id').delete(protect, deleteAddress); // Delete Address


router.route('/order/create').post(protect,createOrder);
router.route('/order/verify').post(protect,verifyOrder);
router.route('/getUserOrders').get(protect,getUserOrders);

module.exports = router;
