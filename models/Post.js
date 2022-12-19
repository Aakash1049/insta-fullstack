const mongoose=require('mongoose')

const postschema= new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String,  required:true},
    image:{
        // public_id: String,
        type: String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.String,
        ref: "User"
    },
    comments:[{text:String,postedBy:{ type:mongoose.Schema.Types.String, ref: "User"}}],
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    location:{type:String, required:true},
    date: Date
},{timestamps:true})
const Post= mongoose.model('posts',postschema)
module.exports = Post