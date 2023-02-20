const express=require("express");

const {UserModel}=require("../model/user.model");

const jwt=require("jsonwebtoken");

const bcrypt= require("bcrypt");

const userRouter= express.Router();


//the router for the registering
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city}= req.body;

    try{
        bcrypt.hash(password,5,async (err,hash)=>{
            if(err){
                res.send("unable to register");
            }
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city});
                await user.save();
                res.send("The new user has been registered");
            }
        })
    }
    catch{
        res.send("User already exist, please login");
    }
})




//the router for the login
userRouter.post("/login",async(req,res)=>{
        const {email,password} =req.body;

        try{
            const user= await UserModel.find({email});
            if(user.length>0){
                bcrypt.compare(password,user[0].password ,(err,result)=>{
                    if(result){
                        let token= jwt.sign({userID:user[0]._id},"masai");
                        res.send({"msg":"user logged in","token":token})
                    }
                    else{
                        res.send({"msg":"wrong credentials"});
                    }
                })
            }
            else{
                res.send({"msg":"wrong credentials"});
            }
        }
        catch(err){
            res.send({"msg":"user not able to login","error":err.message});
        }
})






module.exports={
    userRouter
}