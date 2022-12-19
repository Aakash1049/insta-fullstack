const jwt = require("jsonwebtoken")
const User = require("../models/User")
exports.isAuthenticated = async function(req,res,next){
   try {
    const {authorization}= req.headers
    console.log(authorization, "is auth", req.body)
    if(!authorization || authorization=="Bearer null"){
        console.log("here")
        return res.status(401).json({
            error:"Please login first"
        })
    }
    // console.log(token)
    let token=authorization.replace("Bearer ","")
    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    req.user = await User.findById(decoded._id)
    // console.log("Authentication done succesfully", req.user)
    next()
   } catch (error){
    console.log("error is here")

    res.status(500).json({
        error:error.message
    })
   }
}