const express=require("express");
const {connection}=require("./configs/db");
const {userRouter}=require("./routes/user.routes");
const {PostRouter}= require("./routes/post.routes");
const {authenticate}=require("./middlewares/authenticate");
const app=express();

require("dotenv").config();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("the home page");
})

app.use("/users",userRouter);

app.use(authenticate);


app.use("/posts",PostRouter);



app.listen(process.env.port, async(req,res)=>{
    try{
        await connection;
        console.log("connected to the mongoDB atlas at port 2500")
    }
    catch{
        console.log("the server was not connected");
    }
    console.log(`port is running at ${process.env.port}`)
})