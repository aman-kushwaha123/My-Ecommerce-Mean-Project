const mongoose=require("mongoose");

const cartschema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
    quantity:{type:Number}
   

})

const cart=mongoose.model("carts",cartschema);

module.exports=cart;  