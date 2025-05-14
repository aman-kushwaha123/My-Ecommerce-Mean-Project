const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    UserName:String,
    Address:{type:String,unique:true}}
)

const address=mongoose.model("addresses",addressSchema);

module.exports=address;  