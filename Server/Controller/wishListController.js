const WishList = require('../MODEL/wishListSchema');

// <-------------------------------------------------------| GETTING WISHLIST ---------------------------------------------------------|>

const getWishlist = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in `req.user` from authentication middleware
        const wishlist = await WishList.findOne({ userId }).populate('items.product'); // Populate product details

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// <-------------------------------------------------------| ADDING PRODUCT TO WISHLIST ---------------------------------------------------------|>

const productAddToWishlist = async (req, res) => {
    try {
        const prodId = req.params.id; // Product ID passed as a URL parameter
        const userId = req.user._id;

        let wishlist = await WishList.findOne({ userId });

        if (wishlist) {
            // Check if product is already in the wishlist
            const existingProduct = wishlist.items.find((item) => item.product.toString() === prodId);

            if (existingProduct) {
                return res.status(400).json({ message: "Product already in wishlist" });
            }

            // Add the new product to the wishlist
            wishlist.items.push({ product: prodId });
        } else {
            // Create a new wishlist for the user
            wishlist = new WishList({
                userId,
                items: [{ product: prodId }],
            });
        }

        await wishlist.save();

        res.status(201).json({ message: "Product added to wishlist" });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// <-------------------------------------------------------| REMOVING PRODUCT FROM WISHLIST -----------------------------------------------------|>

const removeWishlistProduct = async (req, res) => {
    try {
        const prodId = req.params.id; // Product ID passed as a URL parameter
        const userId = req.user._id;

        const wishlist = await WishList.findOne({ userId });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const productIndex = wishlist.items.findIndex((item) => item.product.toString() === prodId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in wishlist" });
        }

        wishlist.items.splice(productIndex, 1); // Remove the product from the wishlist
        await wishlist.save();

        res.status(200).json({ message: "Product removed from wishlist" });
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getWishlist,
    productAddToWishlist,
    removeWishlistProduct,
};
