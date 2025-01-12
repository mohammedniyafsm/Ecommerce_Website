const Cart =require('../Model/cartSchema');
const Product=require('../Model/productSchema');

// <-------------------------------------------------------| GET CART | -------------------------------------------|>

const getCart = async (req, res) => {
    const userId = req.user._id; 
  
    try {
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving cart', error });
    }
  };


  // <-------------------------------------------------------| ADD CART | -------------------------------------------|>

  const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming user is authenticated
  
    try {
      // Find the product to ensure it exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Find or create the user's cart
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: [{ product: productId, quantity }],
          totalAmount: product.price * quantity,
        });
      } else {
        // Check if the product already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        
        if (itemIndex > -1) {
          // If product exists, update the quantity
          cart.items[itemIndex].quantity += quantity;
        } else {
          // If product doesn't exist, add it to the cart
          cart.items.push({ product: productId, quantity });
        }
  
        // Update the total amount
        cart.totalAmount += product.price * quantity;
      }
  
      await cart.save();
      res.status(200).json({ message: 'Product added to cart', cart });
  
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to cart', error });
    }
  };


  module.exports = { getCart, addToCart };