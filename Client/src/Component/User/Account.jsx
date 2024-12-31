import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SaveIcon from '@mui/icons-material/Save';

function Account() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Mohammed',
    lastName: 'Niyaf',
    email: 'mohammedniyaf1477@gmail.com',
    contact: '+91 6363606107',
    birthdate: { day: 'DD', month: 'MM', year: 'YYYY' },
    gender: 'Male',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log('Profile data saved:', profile);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex justify-around mx-52 py-14 ">
      <section >
        <div className="h-[550px] bg-white w-80 my-12 mr-16 rounded-md drop-shadow-lg">
          <div className="h-24 bg-white rounded-[20px]  px-8 flex gap-6">
            <div className="bg-gray-400 h-16 w-16 px-3 py-4 my-4 rounded-[50px] flex items-center justify-center">
              <h1 className="font-bold font-serif text-lg text-blue-950">MN</h1>
            </div>
            <h1 className="mt-6 font-medium text-blue-950">Mohammed Niyaf</h1>
          </div>

          {/* Material-UI List */}
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 4 }}>
            <List component="nav" aria-label="account options">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: '#1e3a8a' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={{ color: '#1e3a8a', fontWeight: selectedIndex === 0 ? 'bold' : 'normal' }}
                />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <LocationOnIcon sx={{ color: '#1e3a8a' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Delivery Address"
                  sx={{ color: '#1e3a8a', fontWeight: selectedIndex === 1 ? 'bold' : 'normal' }}
                />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <ShoppingCartIcon sx={{ color: '#1e3a8a' }} />
                </ListItemIcon>
                <ListItemText
                  primary="My Orders"
                  sx={{ color: '#1e3a8a', fontWeight: selectedIndex === 2 ? 'bold' : 'normal' }}
                />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <FavoriteIcon sx={{ color: '#1e3a8a' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Wishlist"
                  sx={{ color: '#1e3a8a', fontWeight: selectedIndex === 3 ? 'bold' : 'normal' }}
                />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <LockIcon sx={{ color: '#1e3a8a' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Change Password"
                  sx={{ color: '#1e3a8a', fontWeight: selectedIndex === 4 ? 'bold' : 'normal' }}
                />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: '#1e3a8a' }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{ color: '#1e3a8a', fontWeight: selectedIndex === 5 ? 'bold' : 'normal' }}
                />
              </ListItemButton>
            </List>
          </Box>
        </div>
      </section>

      <section>
        <div className="h-auto w-[750px] bg-white mt-12 rounded-lg shadow-inner drop-shadow-lg p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-blue-950 mb-4">Profile Details</h2>
            {isEditing ? (
              <SaveIcon
                sx={{ color: '#1e3a8a', cursor: 'pointer' }}
                onClick={handleSaveClick}
              />
            ) : (
              <BorderColorIcon
                sx={{ color: '#1e3a8a', cursor: 'pointer' }}
                onClick={handleEditClick}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                value={profile.firstName}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                value={profile.lastName}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                value={profile.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contact"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                value={profile.contact}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birthdate</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="day"
                  className="w-1/3 border border-gray-300 rounded-md p-2 mt-1"
                  value={profile.birthdate.day}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      birthdate: { ...prev.birthdate, day: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  name="month"
                  className="w-1/3 border border-gray-300 rounded-md p-2 mt-1"
                  value={profile.birthdate.month}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      birthdate: { ...prev.birthdate, month: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  name="year"
                  className="w-1/3 border border-gray-300 rounded-md p-2 mt-1"
                  value={profile.birthdate.year}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      birthdate: { ...prev.birthdate, year: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input
                type="text"
                name="gender"
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                value={profile.gender}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Account;
