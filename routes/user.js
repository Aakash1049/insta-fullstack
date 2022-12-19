const express= require("express")
const { register, login, profilePicture } = require("../controllers/user")
const { isAuthenticated } = require("../middlewares/auth")

const router= express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/updateProfilePic").put(isAuthenticated,profilePicture)
module.exports = router