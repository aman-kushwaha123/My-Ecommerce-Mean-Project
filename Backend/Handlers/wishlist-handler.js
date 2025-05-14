const mongoose=require("mongoose")
const wishlist=require("../models_db/wishlist")

async function addwishlist(userid,productid){
    let result=new wishlist({
        userId:userid,
        productId:productid
    })
    
    await result.save()
    return result.toObject()

}
async function removewishlist(userid,productid){
    let result=await wishlist.deleteOne({userId:userid},{productId:productid})
    return;
}

async function getwishlist(userid){
    let result=await wishlist.find({
        userId:userid
    }).populate('productId')
    return result.map(x=>x.productId.toObject())
}

module.exports={
    addwishlist,
    removewishlist,
    getwishlist

}

