import React, { useState } from 'react';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TollOutlinedIcon from '@mui/icons-material/TollOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Category from '../../Pages/Admin/Category';
import Customer from '../../Pages/Admin/Customer';
import Product from '../../Pages/Admin/Product';
import Order from '../../Pages/Admin/Order'; // Assuming you have an Order component
import Sales from '../../Pages/Admin/Sale';

function Navbaradmin() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(''); // Tracks selected menu item
  const [productOpen, setProductOpen] = useState(false); // Tracks whether "Product" sub-menu is open

  const menuItems = [
    {
      key: 'products',
      icon: <TollOutlinedIcon />,
      label: 'Products',
      children: [
        { key: 'productList', label: 'Product List' },
        { key: 'category', label: 'Category' },
      ],
    },
    { key: 'Sales', icon: <LoyaltyOutlinedIcon />, label: 'Sales' },
    { key: 'Customers', icon: <PeopleAltOutlinedIcon />, label: 'Customers' },
    { key: 'orders', icon: <ShoppingCartIcon />, label: 'Orders' },
    { key: 'Analytics', icon: <TrendingUpOutlinedIcon />, label: 'Analytics' },
    { key: 'Notification', icon: <NotificationsNoneOutlinedIcon />, label: 'Notification' },
    { key: 'Setting', icon: <SettingsOutlinedIcon />, label: 'Setting' },
  ];

  const handleItemClick = (key) => {
    if (key === 'products') {
      setProductOpen(!productOpen);
    } else {
      setSelectedItem(key);
      setProductOpen(false); // Close "Product" sub-menu when other items are selected
    }
  };

  return (
    <div>
      <div className="w-screen h-20 bg-white shadow-md fixed">
        <div className="flex py-6 px-8 items-center">
          <span
            onClick={() => setDashboardOpen(!dashboardOpen)}
            className="text-gray-500 cursor-pointer text-2xl"
          >
            {dashboardOpen ? <MenuOpenRoundedIcon /> : <DehazeRoundedIcon />}
          </span>
        </div>
      </div>

      <div className="flex bg-slate-100 h-screen w-screen mt-20">
        {/* Sidebar */}
        <div
          className={`h-screen bg-white shadow-md transition-all duration-300 ${dashboardOpen ? 'w-64' : 'w-16'}`}
        >
          {/* Navbar Header Section */}
          <div className="p-4 flex items-center">
            {dashboardOpen && (
              <p className="text-gray-700 font-bold ml-4">Dashboard</p>
            )}
          </div>

          {/* Sidebar Menu Items */}
          <div className="p-4">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.key}>
                  {/* Main Menu Items */}
                  <div
                    onClick={() => handleItemClick(item.key)}
                    className={`flex items-center space-x-4 text-gray-700 cursor-pointer p-2 rounded-md ${
                      selectedItem === item.key
                        ? 'bg-gray-200 text-blue-500'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    {dashboardOpen && (
                      <span className="flex-grow">{item.label}</span>
                    )}
                    {/* Expand/Collapse Icon for Products */}
                    {dashboardOpen && item.children && (
                      <span>
                        {productOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </span>
                    )}
                  </div>

                  {/* Sub-menu for Products */}
                  {item.children && productOpen && dashboardOpen && (
                    <ul className="ml-8 mt-2 space-y-2">
                      {item.children.map((subItem) => (
                        <li
                          key={subItem.key}
                          onClick={() => setSelectedItem(subItem.key)}
                          className={`cursor-pointer text-gray-700 p-2 rounded-md ${
                            selectedItem === subItem.key
                              ? 'bg-gray-300 text-blue-500'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {subItem.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow p-8">
          {/* Conditionally render the component based on the selected item */}
          {selectedItem === 'productList' && <Product />}
          {selectedItem === 'category' && <Category />}
          {selectedItem === 'Sales' && <Sales/>} {/* Add your Sales component here */}
          {selectedItem === 'Customers' && <Customer />}
          {selectedItem === 'orders' && <Order />} {/* Add your Order component here */}
          {selectedItem === 'Analytics' && <h1>Analytics Page</h1>} {/* Add your Analytics component here */}
          {selectedItem === 'Notification' && <h1>Notification Page</h1>} {/* Add your Notification component here */}
          {selectedItem === 'Setting' && <h1>Setting Page</h1>} {/* Add your Settings component here */}
        </div>
      </div>
    </div>
  );
}

export default Navbaradmin;
