const mongoose=require("mongoose");

const brandschema=new mongoose.Schema({
      name:String,


})

const brand=mongoose.model("brands",brandschema);



module.exports=brand; 