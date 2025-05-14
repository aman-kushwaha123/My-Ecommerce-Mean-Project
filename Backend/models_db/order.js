const mongoose=require("mongoose");

const orderschema=new mongoose.Schema({
     userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
     date:Date,
     items:[{type:mongoose.Schema.Types.Mixed}],
     Address:{type:mongoose.Schema.Types.Mixed},
     shippingcharge:{type:Number,default:0},
     deliverycharge:{type:Number,default:0},
     total:Number,
     paymentmode:String,
     status:String,


})

const order=mongoose.model("orders",orderschema);

module.exports=order; 