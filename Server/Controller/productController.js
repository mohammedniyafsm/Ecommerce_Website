const Category = require('../Model/categorySchema');
const Product = require('../Model/productSchema');


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
// <                             <$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ USER SIDE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$>                            > //
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv//



 // <-------------------------------------------------------| GET PRODUCT | -------------------------------------------|>

const allProduct =async (req,res)=>{
  try {
    const product = await Product.find(); // Fetch all categories
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching PRODUCT", error: error.message });
  }
}


// <-------------------------------------------------------| RENDERING PRODUCTS ACCORDING TO THE CATEGORIES -----------------------------------|>

const productLoad = async (req, res) => {
  try {
    const categoryName = req.params.categoryName; // Get the category name from the URL
    const category = await Category.findOne({ categoryName }); // Find the category by name

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ category: category._id }); // Fetch products by category ID

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json(products); // Send back the products
  } catch (error) {
    console.log("Error loading products by category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// <-------------------------------------------------------| RENDERING DETAILED VIEW OF A  PRODUCTS -------------------------------------------|>
const productSingleView = async (req, res) => {
  try {
    const id = req.params.id;
    
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
    
  } catch (error) {
    console.log("Try catch error in productSingleView 🤷‍♀️📀🤷‍♂️");
    console.log(error.message);

    // Handle errors gracefully
    res.status(500).json({ message: "Server error" });
  }
};






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

       // <-------------------------------------------------------| GET ALL PRODUCT | -------------------------------------------|>


const getProduct=async(req,res)=>{
  try {
    const product = await Product.find(); // Fetch all categories
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching PRODUCT", error: error.message });
  }
}

module.exports = { addProduct,getProduct,allProduct,productLoad,productSingleView};
