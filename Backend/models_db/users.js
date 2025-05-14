const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
      name:String,
      email:String,
      password:String,
      isAdmin:Boolean,


})

const User=mongoose.model("users",userschema);

module.exports=User; 