import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useAuth} from '../../context/store';

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const {token} =useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/productView/${id}`);
        setProduct(response.data);
        setMainImage(response.data.images[0]?.url);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddCart = async (productId) => {
    try {
      await axios.post( `http://localhost:3000/api/user/cart`, { productId, quantity },{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product added to cart successfully!');
    } catch (error) {
      setError('Failed to add product to cart');
    }
  };

  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  // Handle incrementing quantity
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle decrementing quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
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
              onClick={() => handleImageClick(image.url)}
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
            <button className="border px-2" onClick={decrementQuantity}>-</button>
            <input type="text" value={quantity} className="w-12 text-center border" readOnly />
            <button className="border px-2" onClick={incrementQuantity}>+</button>
          </div>
          <button className="mt-4 bg-black text-white p-2 w-full " onClick={()=>handleAddCart(product._id)}>ADD TO CART</button>
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
