const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt');


const userSchema=Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    otp:{
     type:String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
    },{
        timestamps: true,
    })

// Hash password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


const User=mongoose.model('User',userSchema);
module.exports=User;