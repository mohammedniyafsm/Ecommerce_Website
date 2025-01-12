const Category=require('../Model/categorySchema');



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
// <                             <$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ADMIN SIDE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$>                            > //
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv//



// <-------------------------------------------------------| ADDING CATEGORY | -------------------------------------------|>


const addCategory = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }
  
      const newCategory = await Category.create({
        categoryName: req.body.categoryName,
        image: {
          url: req.file.path, // Cloudinary URL
        },
      });
  
      res.status(200).json({ message: "Category added successfully", category: newCategory });
    } catch (error) {
      console.error("Error while adding category:", error);
      res.status(500).json({ message: "Error while adding category", error: error.message });
    }
  };



  
// <-------------------------------------------------------| RETRIEVE ALL CATEGORY | -------------------------------------------|>

 
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error while fetching categories", error: error.message });
    }
};

// <-------------------------------------------------------| UPDATING  CATEGORY | -------------------------------------------|>


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get category ID from URL
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated category
            runValidators: true, // Ensure the updated data is validated
        });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error while updating category", error: error.message });
    }
};



// <-------------------------------------------------------| REMOVE ALL CATEGORY | -------------------------------------------|>


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params; // Get category ID from URL
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting category", error: error.message });
    }
};

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };



