const express=require('express');
const router=express.Router();
const {Signup,verifyOtp, Login}=require('../Controller/userController');
const {protect}=require('../Middleware/AuthMiddleware');

router.route('/signup').post(Signup);
router.route('/login').post(Login);
router.route('/verifyOtp').post(verifyOtp);

module.exports=router;