import React from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SegmentIcon from '@mui/icons-material/Segment';
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between px-12 py-8 h-20 w-screen drop-shadow-lg bg-white fixed top-0 z-10">
      <div className="font-semibold text-gray-600 cursor-pointer">
        <h1 onClick={() => navigate('/')} >COZA STORE</h1>
      </div>
      <div className="flex font-semibold text-gray-600 gap-11 ml-24 cursor-pointer">
        <h1 onClick={() => navigate('/')}>Home</h1>
        <h1 onClick={() => navigate('/shop')}>Shop</h1>
        <h1 onClick={() => navigate('/about')}>About</h1>
        <h1 onClick={() => navigate('/contact')}>Contact US</h1>
      </div>
      <div className="flex gap-6 text-gray-600 cursor-pointer items-center">
        <SearchIcon />
        <ShoppingCartIcon onClick={() => navigate('/cart')} />
        <FavoriteBorderIcon />
        <PermIdentityIcon onClick={() => navigate('/account')} />
        <button onClick={() => navigate('/login')} className='bg-blue-600 text-white rounded-md h-8 w-16'>
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
