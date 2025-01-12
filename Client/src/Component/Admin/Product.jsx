import React, { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useAuth } from "../../context/store";
import AddProduct from "./AddProduct"; // Ensure this import is correct

function Product() {
  const [productNameOpen, setProductNameOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false); 
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(false); // State for toggling Add Product form visibility
  
  const toggleDropdown = (field) => {
    if (field === "productName") setProductNameOpen(!productNameOpen);
    if (field === "category") setCategoryOpen(!categoryOpen);
    if (field === "status") setStatusOpen(!statusOpen);
    if (field === "price") setPriceOpen(!priceOpen);
  };
  
  const { token } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [token]);

  return (
    <div className="px-2 py-2">
      <div className="bg-white min-h-[650px] w-[1200px] rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex justify-between px-8 py-4 h-18 items-center border-b border-gray-300">
          <div className="font-semibold text-xl w-52">
            <h1>Product List</h1>
          </div>
          <div className="space-x-2 flex">
            <button className="rounded-md bg-white border text-sm border-gray-300 text-gray-500 h-8 w-20 hover:bg-gray-100 ">
              <FilterAltOutlinedIcon className="text-gray-500" />
              <span>Filter</span>
            </button>
            <button className="rounded-md bg-gray-300 text-sm border border-gray-300 text-gray-500 h-8 w-16 hover:bg-white">
              See All
            </button>
            <button className="rounded-md bg-blue-700 text-white h-8 w-32 text-sm ">
              <AddOutlinedIcon className="text-xs" />
              <span onClick={() => setAddProduct(!addProduct)}>Add Product</span>
            </button>
          </div>
        </div>

        {/* Conditional Rendering of AddProduct Component */}
        {addProduct ? (
          <AddProduct /> // Display AddProduct when `addProduct` is true
        ) : (
          <>
            {/* Product Selection Section */}
            <div className="flex h-18 px-2 py-2 border-b border-gray-300 space-x-4">
              {/* Product Name Dropdown */}
              <div className="flex flex-col w-1/5">
                <label htmlFor="stock" className="text-sm text-gray-700">Product:</label>
              </div>
              
              <div className="flex flex-col w-1/5">
                <label htmlFor="productName" className="text-sm text-gray-700">
                  Product Name:
                  <span onClick={() => toggleDropdown("productName")} className="cursor-pointer">
                    <ExpandMoreIcon className={`transform ${productNameOpen ? "rotate-180" : ""} inline-block ml-2`} />
                  </span>
                </label>
                {productNameOpen && (
                  <select name="productName" id="productName" className="mt-2 p-2 border border-gray-300 rounded-md text-sm">
                    <option value="Shirt">Shirt</option>
                    <option value="Tshirt">Tshirt</option>
                    <option value="Pant">Pant</option>
                  </select>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col w-1/5">
                <label htmlFor="category" className="text-sm text-gray-700">
                  Category:
                  <span onClick={() => toggleDropdown("category")} className="cursor-pointer">
                    <ExpandMoreIcon className={`transform ${categoryOpen ? "rotate-180" : ""} inline-block ml-2`} />
                  </span>
                </label>
                {categoryOpen && (
                  <select name="category" id="category" className="mt-2 p-2 border border-gray-300 rounded-md text-sm">
                    <option value="Men">Men</option>
                    <option value="Women">Accessories</option>
                  </select>
                )}
              </div>

              {/* Price Input */}
              <div className="flex flex-col w-1/5">
                <label htmlFor="price" className="text-sm text-gray-700">
                  Price:
                  <span onClick={() => toggleDropdown("price")} className="cursor-pointer">
                    <ExpandMoreIcon className={`transform ${priceOpen ? "rotate-180" : ""} inline-block ml-2`} />
                  </span>
                </label>
                {priceOpen && (
                  <input type="number" id="price" name="price" className="mt-2 p-2 border border-gray-300 rounded-md text-sm" />
                )}
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col w-1/5">
                <label htmlFor="status" className="text-sm text-gray-700">
                  Status:
                  <span onClick={() => toggleDropdown("status")} className="cursor-pointer">
                    <ExpandMoreIcon className={`transform ${statusOpen ? "rotate-180" : ""} inline-block ml-2`} />
                  </span>
                </label>
                {statusOpen && (
                  <select name="status" id="status" className="mt-2 p-2 border border-gray-300 rounded-md text-sm">
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Pre-Order">Pre-Order</option>
                  </select>
                )}
              </div>
            </div>

            {/* Product Details */}
            {!addProduct && products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="flex space-x-4 px-2 py-4 items-center text-gray-600 border-b border-gray-300">
                  <div className="flex space-x-4 ml-4 mr-20">
                    <img src={product.images[0]?.url || "https://via.placeholder.com/150"} alt={product.name || "Product Image"} className="h-16 w-12 object-cover" />
                  </div>
                  <div className="grid grid-cols-6 space-x-4 w-[800px] pl-8">
                    <h1 className="text-sm font-semibold">{product.name || "N/A"}</h1>
                    <h1 className="text-sm font-semibold pl-6">men</h1>
                    <h1 className="text-sm pl-14">${product.price || "0.00"}</h1>
                    <h1 className="text-sm pl-28">{product.stock || "Not Specified"}</h1>
                    <h1 className="text-sm pl-36">Active</h1>
                    <h1 className="text-sm pl-48">info</h1>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No products available</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
