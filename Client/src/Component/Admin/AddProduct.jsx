import React, { useState } from 'react';
import axios from "axios";
import { useAuth } from "../../context/store";

function AddProduct() {
    // Form States
    const [productName, setProductName] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Available");
    const [categoryImage, setCategoryImage] = useState(null);
    const { token } = useAuth(); // Assuming token is available in useAuth context
    const [products, setProducts] = useState([]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("categoryName", newCategoryName);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("status", status);
        formData.append("description", description);
        
        // If multiple images are to be uploaded
        if (categoryImage && categoryImage.length > 0) {
            Array.from(categoryImage).forEach((file) => {
                formData.append("images", file);
            });
        }

        try {
            const response = await axios.post("http://localhost:3000/api/admin/addProduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Product added successfully:", response.data);
            alert("Product added successfully!");
            
            // Reset form and update product list
            setProductName("");
            setNewCategoryName("");
            setPrice("");
            setStock("");
            setDescription("");
            setCategoryImage(null);
            setStatus("Available");
            setProducts([...products, response.data]);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <div className="px-8 py-4 border-b border-gray-300">
            <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="productName" className="text-sm text-gray-700">
                        Product Name:
                    </label>
                    <input
                        id="productName"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="categoryName" className="text-sm text-gray-700">
                        Category Name:
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="text-sm text-gray-700">
                        Price:
                    </label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="stock" className="text-sm text-gray-700">
                        Stock:
                    </label>
                    <input
                        id="stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-sm text-gray-700">
                        Description:
                    </label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="categoryImage" className="text-sm text-gray-700">
                        Upload Images:
                    </label>
                    <input
                        id="categoryImage"
                        type="file"
                        multiple
                        onChange={(e) => setCategoryImage(e.target.files)}
                        className="border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="status" className="text-sm text-gray-700">
                        Status:
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                    >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Pre-Order">Pre-Order</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
