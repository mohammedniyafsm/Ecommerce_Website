import React, { useState, useEffect } from 'react';
import { banner } from '../../assests/assests';
import Footer from '../../Component/User/Footer';
import Option from '../../Component/User/Option';
import ProductList from '../../Component/User/ProductList';

function Home() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 4000); // Change banner every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='mt-12'>
      <div className="w-screen h-[680px] flex items-center justify-center">
        <img
          src={banner[currentBannerIndex]}
          alt={`Banner ${currentBannerIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      <Option />
      <ProductList/>
      <Footer />
    </div>
  );
}

export default Home;
