import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // to make the field searchable with optimization
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //using cloudinary URL
            requierd: true
        },
        coverImage: {
            type: String, //using cloudinary URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video',
            }
        ],
        password: {
            type: String, // password has to be encrypted before saving in database
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
        }
    },
    {timestamps: true}
)

userSchema.pre("save", async function (next) {  //this is a middleware to encrypt the password before saving it to the database
    if(!this.isModified("password")) return next();//if the password is not modified, then we don't need to encrypt it again
    
    this.password = await bcryptjs.hash(this.password, 8); //bycrypt.hash() creates encryption layer to the password to safeguard it
    next() //this is to move to the next middleware
})

userSchema.methods.isPasswordCorrect = async function (password) { // this method is created to check the password if correct when user logs in 
    return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
        _id = this._id,
        username = this.username,
        fullname = this.fullname,
        email = this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRY,
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id = this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRY,
    )
}

export const User = mongoose.model('User', userSchema);