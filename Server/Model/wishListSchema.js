const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WishListSchema=Schema({
    userId: {
        type: String,
        required: true
    },
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
        }
    }]
})

const WishList = mongoose.model('WishList',WishListSchema);
module.exports=WishList;