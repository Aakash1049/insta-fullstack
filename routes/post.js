const express= require("express")
const { createPost, deletePost, updatePost, getAllPosts, myposts, Like, Unlike, comment } = require("../controllers/post")
const { isAuthenticated } = require("../middlewares/auth")
const router= express.Router()

router.route("/posts").get(isAuthenticated, getAllPosts)
router.route("/myposts").get(isAuthenticated, myposts)
router.route("/posts").post(isAuthenticated,createPost)
router.route("/posts/:id").delete(isAuthenticated,deletePost)
router.route("/posts/:id").put(isAuthenticated,updatePost)
router.route("/like").put(isAuthenticated,Like)
router.route("/unlike").put(isAuthenticated,Unlike)
router.route("/comments").put(isAuthenticated,comment)

module.exports = router