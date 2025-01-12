import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams to get the product ID from the URL

function ProductView() {
  const { id } = useParams();  // Get product ID from the URL
  const [product, setProduct] = useState(null);  // State to store product data
  const [loading, setLoading] = useState(true);  // State to manage loading status
  const [error, setError] = useState(null);  // State to handle errors
  const [mainImage, setMainImage] = useState(null);  // State to manage the main image

  // Fetch product details based on product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/productView/${id}`);
        setProduct(response.data);  // Set product data
        setMainImage(response.data.images[0]?.url);  // Set the first image as the main image
        setLoading(false);  // Update loading state
      } catch (error) {
        setError('Failed to fetch product details');
        setLoading(false);  // Update loading state
      }
    };

    fetchProduct();
  }, [id]);

  // Return loading or error message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle image click to change the main image
  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  return (
    <div className="mt-28 px-52 py-14">
      <div className="flex gap-10">
        {/* Left side images */}
        <div className="flex flex-col gap-4">
          {product.images && product.images.map((image, index) => (
            <img
              key={index}
              className="w-20 h-20 border cursor-pointer"
              src={image.url}
              alt={`View ${index + 1}`}
              onClick={() => handleImageClick(image.url)}  // Update main image on click
            />
          ))}
        </div>

        {/* Main product image */}
        <div className="">
          <img className="w-[452px] h-[452px]" src={mainImage} alt="Main View" />
        </div>

        {/* Product details */}
        <div className="w-1/3">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg font-semibold text-gray-700">${product.price}</p>
          <p className="mt-4 text-sm text-gray-500">{product.description}</p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Size:</label>
            <select className="border p-2 w-full mt-2">
              <option>Select size</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Color:</label>
            <select className="border p-2 w-full mt-2">
              <option>Select color</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button className="border px-2">-</button>
            <input type="text" value="1" className="w-12 text-center border" />
            <button className="border px-2">+</button>
          </div>
          <button className="mt-4 bg-black text-white p-2 w-full">ADD TO CART</button>
          <div className="mt-4 flex gap-2">
            <button className="border p-2 w-full">Share</button>
            <button className="border p-2 w-full">Like</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
