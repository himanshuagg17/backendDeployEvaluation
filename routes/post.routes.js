const express=require("express");

const {PostModel}= require("../model/post.model");

const PostRouter=express.Router();

PostRouter.get("/",async(req,res)=>{
    const posts= await PostModel.find();
    res.send(posts);
})



//router to create the posts
PostRouter.post("/create",async (req,res)=>{
    const payload= req.body;
    const post= new PostModel(payload);
    await post.save();
    res.send({"msg":"The post has been created"});
})



PostRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const postID=req.params.id;
    const post= await PostModel.findOne({_id:postID});
    const userID_post= post.userID;
    const userID_req=req.body.userID;
    try{
        if(userID_req!==userID_post){
            res.send({"msg":"you are not authorized to update"});
        }
        else{
            await PostModel.findByIdAndUpdate({_id:postID},payload);
            res.send({"msg":"Note has been updated"});
        }
    }
    catch(err){
        res.send({"msg":"unable to update data"});
    }
})





// PostRouter.delete("/delete/:id",async(req,res)=>{
//     const postID=req.params.id;

//     await PostModel.findByIdAndDelete({_id:postID});
//     res.send("the post has been deleted");
// })


PostRouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id;
    const post= await PostModel.findOne({_id:postID});
    const userID_post= post.userID;
    const userID_req=req.body.userID;
    try{
        if(userID_req!==userID_post){
            res.send({"msg":"you are not authorized to update"});
        }
        else{
            await PostModel.findByIdAndUpdate({_id:postID},payload);
            res.send({"msg":"Note has been updated"});
        }
    }
    catch(err){
        res.send({"msg":"unable to update data"});
    }
})


PostRouter.patch("/update/:id",async(req,res)=>{
    const pid=req.params.id;
    const payload=req.body;

    await PostModel.findByIdAndUpdate({_id:pid},payload);
    res.send("post updated");
})



module.exports={
    PostRouter
}