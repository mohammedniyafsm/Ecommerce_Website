import React, { useEffect, useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
import { useAuth } from "../../context/store";


function Category() {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const {token} =useAuth();
 
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/categories",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", newCategoryName);
    formData.append("image", categoryImage);

    try {
      await axios.post("http://localhost:3000/api/admin/addCategory", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setNewCategoryName("");
      setCategoryImage(null);
      setAddCategory(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/categories/${id}`,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

 
const handleAction = async (id, currentStatus) => {
  try {
    await axios.put(
      `http://localhost:3000/api/admin/categories/${id}`,
      { active: !currentStatus }, // Correctly passing the request body
      {
        headers: {
          "Content-Type": "application/json", // Change to application/json if not uploading files
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchCategories(); // Refresh the category list after updating
  } catch (error) {
    console.error("Error updating category status:", error.response?.data || error.message);
  }
};


  return (
    <div className="px-2 py-2">
      <div className="bg-white min-h-[650px] w-[1200px] rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex justify-between px-8 py-4 h-18 items-center border-b border-gray-300">
          <div className="font-semibold text-xl w-52">
            <h1>Category List</h1>
          </div>
          <div className="space-x-2 flex">
            <button className="rounded-md bg-white border text-sm border-gray-300 text-gray-500 h-8 w-20 hover:bg-gray-100">
              <FilterAltOutlinedIcon className="text-gray-500" />
              <span>Filter</span>
            </button>
            <button className="rounded-md bg-gray-300 text-sm border border-gray-300 text-gray-500 h-8 w-16 hover:bg-white">
              See All
            </button>
            <button
              onClick={() => setAddCategory(!addCategory)}
              className="rounded-md bg-blue-700 text-white h-8 w-32 text-sm"
            >
              <AddOutlinedIcon className="text-xs" />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Add Category Form */}
        {addCategory && (
          <div className="px-8 py-4 border-b border-gray-300">
            <form onSubmit={handleAddCategory} className="space-y-4">
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
                <label htmlFor="categoryImage" className="text-sm text-gray-700">
                  Upload Image:
                </label>
                <input
                  id="categoryImage"
                  type="file"
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                  className="border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Add Category
              </button>
            </form>
          </div>
        )}

         {/* Product Selection Section */}
      <div className="flex h-18 px-2 py-2 border-b border-gray-300 space-x-4">
          <div className="flex flex-col w-1/5">
            <label htmlFor="productName" className="text-sm text-gray-700">
               
            </label>   
          </div>
          <div className="flex flex-col w-1/5">
            <label htmlFor="productName" className="text-sm text-gray-700">
              Category Name: 
            </label>   
          </div>
          <div className="flex flex-col w-1/5">
            <label htmlFor="productName" className="text-sm text-gray-700">
             Status: 
            </label>   
          </div>
          <div className="flex flex-col w-1/5">
            <label htmlFor="productName" className="text-sm text-gray-700">
             Action: 
            </label>   
          </div>
          
      </div>

        {/* Category List */}
        {!addCategory && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="flex space-x-4 px-2 py-4 items-center text-gray-600 border-b border-gray-300"
            >
              {/* Category Image */}
              <div className="flex space-x-4 ml-4 mr-32">
                <img
                  src={category.image.url}
                  alt="Category"
                  className="h-18 w-12"
                />
              </div>

              {/* Category Details */}
              <div className="grid grid-cols-4 space-x-10 w-[800px] pl-16">
                <h1 className="text-sm">{category.categoryName}</h1>
                {category.active ? (
                  <h1 className="text-sm px-2 py-1 bg-green-700 rounded-lg w-14 h-8 text-slate-200">
                    Active
                  </h1>
                ) : (
                  <h1 className="text-sm px-2 py-1 bg-red-700 rounded-lg w-16 h-8 text-slate-200">
                    Inactive
                  </h1>
                )}
                <h1
                  onClick={() => handleAction(category._id, category.active)}
                  className={`text-sm px-2 py-1 ${
                    category.active ? "bg-red-500" : "bg-green-500 w-16"
                  } rounded-lg w-14 h-8 text-slate-200 cursor-pointer`}
                >
                  {category.active ? "Block" : "Unblock"}
                </h1>
                <h1
                  onClick={() => handleDelete(category._id)}
                  className="text-sm px-2 py-1 bg-red-700 rounded-lg w-14 h-8 text-slate-200 cursor-pointer"
                >
                  Delete
                </h1>
              </div>
            </div>
          ))
        ) : !addCategory ? (
          <div className="text-gray-500 text-center py-4">No categories available</div>
        ) : null}
      </div>
    </div>
  );
}

export default Category;
