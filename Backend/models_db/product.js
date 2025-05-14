const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
      name:String,
      shortdescription:String,
      description:String,
      price:Number,
      discount:Number,
      images:Array(String),
      categoryid:{type:mongoose.Schema.Types.ObjectId,ref:'categories'},
      brandid:{type:mongoose.Schema.Types.ObjectId,ref:'brands'},
      isfeatured:{type:Boolean,default:false},
      isNewproduct:{type:Boolean,default:false},


})

const product=mongoose.model("products",productschema);

module.exports=product; 