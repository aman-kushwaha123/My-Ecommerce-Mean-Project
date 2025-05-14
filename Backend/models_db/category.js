const mongoose=require("mongoose");

const categoryschema=new mongoose.Schema({
      name:String,


})

const Category=mongoose.model("Categories",categoryschema);



module.exports=Category; 