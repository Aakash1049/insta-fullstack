const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {

    try {
        const { name, email, password } = req.body

        // console.log(password,"while sign up")
        let user = await User.findOne({ email  })
        if (user) {
            console.log(user)
            return res
                .status(400)
                .json({ success: "fail", error: "user already exsits" })
        }

        user = await User.create({ name, email, password })
        // console.log(user)
        res.status(201).json({ success: "Account created scuccefully", user })
    } catch (error) {
        res.status(500).json({
            success: "fail",
            error: error.message
        })
    }
}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body
        console.log(password,"while login")
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: "fail",
                error: "user does not exist"
            })
        }
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(400).json({
                success: "fail",
                error: "Incorrect Password"
            })
        }
        token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res
            .status(200)
            .json({
                message: "Logged in succesfully",
                user,
                token
            })
    } catch (error) {

        res.status(500).json({
            success: "fail",
            error: error.message
        })
    }
}

exports.profilePicture = async (req, res) => {
    User.findByIdAndUpdate(req.user._id,{$set:{profilePic:req.body.profilePic}},{new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:"pic not updated"})
            }
            res.json(result)
        }
        
        )
} 