const User = require('../Model/userSchema');
const randomize = require('randomatic');
const { sendOtpEmail } = require('../utils/nodeMailer');
const { generateToken } = require('../utils/jwt');

// Signup Controller
const Signup = async (req, res) => {
    try {
        const { email } = req.body;
        const EmailExist = await User.findOne({ email });
        if (!EmailExist) {
            const newUser = new User(req.body);
            const generatedOtp = randomize('0', 6); // Generate 6-digit OTP
            newUser.otp = generatedOtp;
            await newUser.save();

            // Send OTP to email
            sendOtpEmail(email, generatedOtp);

            return res.status(200).json({ message: 'Signup successful. Verify your email using the OTP sent.' });
        } else {
            return res.status(400).json({ message: 'Email already exists. Please login.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
};

// Login Controller
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

        const generatedOtp = randomize('0', 6); // Generate 6-digit OTP
        user.otp = generatedOtp;
        await user.save();

        // Send OTP to email
        sendOtpEmail(email, generatedOtp);

        return res.status(200).json({ message: 'OTP sent to your email. Verify to continue.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal error" });
    }
};

// Verify OTP Controller
const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    try {
        const user = await User.findOne({ otp });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Clear OTP after successful verification
        user.otp = '';
        await user.save();

        // Generate token after OTP verification
        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully.',
            token, // Send token for client-side storage
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        });
    } catch (error) {
        console.error('Error during OTP verification:', error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred during OTP verification'
        });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User details fetched successfully',
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};



const updateUser = async (req, res) => {
  try {
    const { id } = req.user; 
    const { username, email, phone } = req.body; 

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, phone },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { Signup, Login, verifyOtp,getUserDetails,updateUser  };
