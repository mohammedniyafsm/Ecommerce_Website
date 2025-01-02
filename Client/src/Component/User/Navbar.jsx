import React from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/store'; // Adjust path as needed

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, LogoutUser } = useAuth(); // Destructure values from useAuth

  return (
    <div className="flex justify-between px-12 py-8 h-20 w-screen drop-shadow-lg bg-white fixed top-0 z-10">
      {/* Logo */}
      <div className="font-semibold text-gray-600 cursor-pointer">
        <h1 onClick={() => navigate('/')}>COZA STORE</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex font-semibold text-gray-600 gap-11 ml-24 cursor-pointer">
        <h1 onClick={() => navigate('/')}>Home</h1>
        <h1 onClick={() => navigate('/shop')}>Shop</h1>
        <h1 onClick={() => navigate('/about')}>About</h1>
        <h1 onClick={() => navigate('/contact')}>Contact Us</h1>
      </div>

      {/* Icons and Buttons */}
      <div className="flex gap-6 text-gray-600 cursor-pointer items-center">
        <SearchIcon />
        <ShoppingCartIcon onClick={() => navigate('/cart')} />
        <FavoriteBorderIcon />
        <PermIdentityIcon onClick={() => navigate('/account')} />
        {/* Conditional Rendering for Login/Logout */}
        {isLoggedIn ? (
          <button
            onClick={() => {
              LogoutUser(); // Logout the user
              navigate('/'); // Redirect to home after logout
            }}
            className="bg-red-600 text-white rounded-md h-8 w-20"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white rounded-md h-8 w-16"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
