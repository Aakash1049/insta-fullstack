const mongoose=require('mongoose')
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]
    },
    email:{
        type:String, 
        unique:[true,"Email already exists"], 
        required:[true,"Please enter a mail"]
    },
    password:{
        type:String, 
        required:[true,"Please enter a Password"]
    },
    profilePic:{
        // public_id: String,
        type: String,
        default:"https://res-console.cloudinary.com/dlji1mozy/thumbnails/v1/image/upload/v1671208946/YmxhbmstcHJvZmlsZS1waWN0dXJlLTk3MzQ2MF9fMzQwX3R4bHU5aQ==/preview"
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
})

userschema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})
userschema.methods.matchPassword= async function (password){
    return await bcrypt.compare(password, this.password)
}

// userschema.methods.generateToken = ()=>{
//     console.log(this._id)
//     return jwt.sign({_id:this._id},process.env.JWT_SECRET)
// }

const User= mongoose.model('users',userschema)
module.exports = User