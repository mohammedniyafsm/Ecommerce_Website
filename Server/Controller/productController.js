const Category = require('../Model/categorySchema');
const Product = require('../Model/productSchema');



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
// <                             <$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ADMIN SIDE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$>                            > //
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv//


       // <-------------------------------------------------------| ADDING PRODUCT | -------------------------------------------|>



const addProduct = async (req, res) => {
  try {
    // Validate file upload
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one product image is required" });
    }

    // Destructure required fields from req.body
    const { categoryName, name, price, offerPrice, description, isFeatured, stock } = req.body;
    console.log(categoryName, name, price, offerPrice, description, isFeatured, stock);
    

    if (!categoryName || !name || !price || !description || !stock) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Find the category by name
    const isCategory = await Category.findOne({ categoryName });
    if (!isCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Process uploaded files into image objects
    const imageObjects = req.files.map((file) => ({
      url: file.path, // Assuming Cloudinary or similar storage is being used
      altText: `${name} image`,
      caption: `${name} product image`,
    }));

    // Create the product
    const newProduct = await Product.create({
      name,
      category: isCategory._id,
      price,
      offerPrice,
      description,
      images: imageObjects,
      isFeatured,
      stock,
    });

    // Respond with success
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({
      message: "Error while adding product",
      error: error.message,
    });
  }
};

const getProduct=async(req,res)=>{
  try {
    const product = await Product.find(); // Fetch all categories
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching PRODUCT", error: error.message });
  }
}

module.exports = { addProduct,getProduct };
