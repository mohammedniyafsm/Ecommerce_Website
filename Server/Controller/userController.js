const User=require('../Model/userSchema');
const randomize = require('randomatic');
const {sendOtpEmail}=require('../utils/nodeMailer');
const { generateToken } = require('../utils/jwt');


const Signup=async(req,res)=>{
    try {
        const {email}=req.body;
        const EmailExist=await User.findOne({email});
        if(!EmailExist){
           const newUser=new User(req.body);
           const generatedOtp = randomize('0', 6);
           newUser.otp = generatedOtp;
           await newUser.save();
           sendOtpEmail(email, generatedOtp);//sending email and otp to nodemailer

           res.status(200).json({
            _id: newUser._id,
            name: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id),
        });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}


const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }
        const generatedOtp = randomize('0', 6);
        user.otp = generatedOtp;
        await user.save();
        sendOtpEmail(email, generatedOtp);//sending email and otp to nodemailer
        res.status(200).json({ message: 'Successfully logged in.',token:generateToken(user._id),user:{ id: user.id}});
    } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Internal error" });
    }
}

const verifyOtp=async(req,res)=>{
    const { otp } = req.body;

    try {
        const user = await User.findOne({ otp });

        if (!user) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        user.otp = '';
        await user.save();

        return res.json({ success: true });
    } catch (error) {
        console.error('Error during OTP verification:', error.message);
        return res.status(500)
            .json(
                {
                    success: false,
                    message: 'An error occurred during OTP verification'
                }
            );
    }
}

module.exports={Signup,Login,verifyOtp};