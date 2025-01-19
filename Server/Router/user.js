const express=require('express');
const router=express.Router();
const {
    Signup,
    verifyOtp,
    Login
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

const {protect}=require('../Middleware/AuthMiddleware');



router.route('/signup').post(Signup); //Create Account
router.route('/login').post(Login); //Login Account 
router.route('/verifyOtp').post(verifyOtp); //OTP VERIFICATION

router.route('/allProduct').get(allProduct); //Getting ALL Product
router.route('/product/:categoryName').get(productLoad); //RENDERING  PRODUCT ACCORDING TO CATEGORY 
router.route('/productView/:id').get(productSingleView);  //RENDERING DETAILS OF SINGLE PRODUCT

router.route('/cart').get(protect,getCart); //Getting  Cart
router.route('/cart').post(protect,addToCart); //Adding cart
router.route('/cart/:productId').delete(protect,deleteCartItem); //Delete cart
router.route('/cart').put(protect,updateCart); //Update cart

router.route('/wishlist').get(protect,getWishlist); //Getting  wishlist
router.route('/wishlist/:id').post(protect,productAddToWishlist); //Adding wishlist
router.route('/wishlist/:id').delete(protect,removeWishlistProduct); //Deleting wishlist



module.exports=router;