import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth} from '../../../context/store';  

function EmailOtp() {
  const { storeTokenInLS } = useAuth(); 
  const location = useLocation();
  const { email } = location.state || {}; // Retrieve email from state
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const otpResponse = await axios.post("http://localhost:3000/api/user/verifyOtp", {
        otp,
      });

      if (otpResponse.data.success) {
        const {token} =otpResponse.data;
        storeTokenInLS(token);
        notifySuccess("OTP Verified! Redirecting...");
        setTimeout(() => {
          navigate("/"); // Redirect after successful OTP verification
        }, 2000);
      } else {
        notifyError("Invalid OTP. Please try again."); // Show error notification
      }
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
      notifyError("An error occurred during OTP verification. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          OTP VERIFICATION
        </h2>
        <form onSubmit={handleOtpVerification}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email || "No email provided"}
              readOnly // Make the field non-editable
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          {/* OTP Field */}
          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleOtpChange}
              value={otp}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Verify OTP
            </button>
          </div>
        </form>
        {/* Footer */}
        <p className="text-center text-gray-600 mt-4">
          Didn't receive an OTP?{" "}
          <Link to="/resend-otp" className="text-blue-500 hover:underline">
            Resend
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EmailOtp;
