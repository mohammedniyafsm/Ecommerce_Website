const Address = require('../Model/addressSchema');

// Get addresses for a user
const getAddress = async (req, res) => {
    try {
        const userId = req.user._id; // Ensure req.user is set correctly by middleware
        const addresses = await Address.find({ userId });
        if (!addresses.length) {
            return res.status(404).json({ msg: "No addresses found" });
        }
        res.status(200).json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ err: "Internal server error" });
    }
};

// Add a new address
const addAddress = async (req, res) => {
    try {
        const userId = req.user._id;  // Get user ID from token
        const { firstName,lastName,landmark,addressDetail,state,zip,phone} = req.body;

        // Find the user and push the new address to the 'address' array
        const userAddress = await Address.findOne({ userId });

        if (!userAddress) {
            // If the user doesn't have an address yet, create a new address array
            const newAddress = new Address({
                userId,
                address: [{
                    firstName,
                    lastName,
                    landmark,
                    addressDetail,
                    state,
                    zip,
                    phone,
                }]
            });
            const savedAddress = await newAddress.save();
            return res.status(201).json(savedAddress);
        } else {
            // If the user already has addresses, push the new one into the address array
            userAddress.address.push({
                firstName,
                lastName,
                landmark,
                addressDetail,
                state,
                zip,
                phone,
            });

            const updatedAddress = await userAddress.save();
            return res.status(200).json(updatedAddress);
        }
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ err: "Internal server error" });
    }
};


// Update an address
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;  
        const updatedData = req.body;  // Data to update the address with

        // Find the user address document by userId and address _id
        const userAddress = await Address.findOne({ 'address._id': id });

        if (!userAddress) {
            return res.status(404).json({ msg: "Address not found" });
        }

        // Find the specific address within the address array by _id
        const addressIndex = userAddress.address.findIndex(address => address._id.toString() === id);

        if (addressIndex === -1) {
            return res.status(404).json({ msg: "Address not found" });
        }

        // Update the specific address object
        userAddress.address[addressIndex] = { ...userAddress.address[addressIndex], ...updatedData };

        // Save the updated user address document
        await userAddress.save();

        res.status(200).json(userAddress);
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ err: "Internal server error" });
    }
};


// Delete an address
const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;  // Address ID to delete

        // Find the user address document that contains the address with the given _id
        const userAddress = await Address.findOne({ 'address._id': id });

        if (!userAddress) {
            return res.status(404).json({ msg: "Address not found" });
        }

        // Use the $pull operator to remove the address from the array
        userAddress.address.pull({ _id: id });

        // Save the updated address document
        await userAddress.save();

        res.status(200).json({ msg: "Address deleted successfully" });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ err: "Internal server error" });
    }
};


module.exports = { getAddress, addAddress, updateAddress, deleteAddress };
