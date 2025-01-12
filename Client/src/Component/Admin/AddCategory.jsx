import React, { useState } from 'react';
import axios from 'axios';

function AddCategory({ token, setAddCategory, fetchCategories }) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  // Add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('categoryName', newCategoryName);
    formData.append('image', categoryImage);

    try {
      await axios.post('http://localhost:3000/api/admin/addCategory', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setNewCategoryName('');
      setCategoryImage(null);
      setAddCategory(false);
      fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
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
  );
}

export default AddCategory;
