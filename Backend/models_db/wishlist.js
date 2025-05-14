const mongoose=require("mongoose");

const wishlistschema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
   

})

const wishlist=mongoose.model("wishlists",wishlistschema);

module.exports=wishlist;  