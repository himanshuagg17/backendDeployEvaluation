const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String
})


const UserModel= mongoose.model("user",UserSchema);

module.exports={
    UserModel
}

