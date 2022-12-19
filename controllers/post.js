// const { post } = require("../app")
const Post = require("../models/Post")
const User = require("../models/User")

exports.createPost = async (req,res)=>{
    try {
        console.log(req.body)
        const new_post_data = {
           title: req.body.title,
           body: req.body.body,
           image:req.body.pic,
           location:req.body.location,  
           owner: req.user.name,
           date:Date.now(),
          
        }
        console.log(typeof(date))
        const new_post =await Post.create(new_post_data)
        console.log("line 19")
        const user= await User.findById(req.user._id)
        user.posts.push(new_post._id)
        await user.save()
        res.status(201).json({
            status :"Post created",
            post : new_post
        })


    } catch (error) {
        res.status(500).json({
            success: "fail",
            error : error.message
        })
    }

}

exports.deletePost = async (req,res)=>{
    try {
        
        const post= await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success:"false",
                error:"Post not found"
            })
        }
      
        await post.remove()
        const user= await User.findById(req.user._id)
        const index= user.posts.indexOf(req.params.id)
        user.posts.splice(index,1)
        await user.save()

        res.status(200).json({
            success:"true",
            message:"post deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: "fail",
            error : error.message
        })
    }
}

exports.updatePost = async (req,res)=>{
    console.log(req.body)
    const post= await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success:"false",
                error:"Post not found"
            })
        }
        let update= await Post.updateOne(
            {_id:req.params.id},
            {
                $set:req.body
            }
        )
        res.status(200).json({
            success:"true",
            message:"Post updated"
        })
}

exports.myposts = async (req,res)=>{
    // console.log(req.user)
    let postIds=await User.findById(req.user._id)
    let ids=postIds.posts
    // console.log(data.posts[0],typeof(data.posts[0]))
    var obj_ids = ids.map(function(id) { return String(id); });
    let data=await Post.find({"_id":{$in : obj_ids}}).sort("-createdAt")
    res.send(data)
}

exports.getAllPosts = async (req,res) =>{
    
    let data=await Post.find().sort("-createdAt")
    res.send(data)
}

exports.Like= async (req,res)=>{

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        else res.json(result)
    })
// }
}

exports.Unlike= async(req,res)=>{
    // let post= await Post.findById(req.body.postId)
    // if(!post.likes.includes(req.user._id)) return
    // else{

    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        else res.json(result)
    })
// }
}
exports.comment= async(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user.name
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    }).exec((err,result)=>{
        // console.log(result)
        if(err){
            return res.status(422).json({
                error:err
            })
        }
        else res.json(result)
    })
}