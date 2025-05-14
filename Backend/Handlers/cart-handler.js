
const  cart=require("../models_db/cart")

async function addtocart(userid,productid,quantity){
    const product=await cart.findOne({
        userId:userid,
        productId:productid

    })
    if(product){
      
       await cart.findByIdAndUpdate(product._id,{
        quantity:product.quantity+quantity
        
       })
      
    }
    else{
        
        const result=new cart({
            userId:userid,
            productId:productid,
            quantity:quantity
        })
        
        await result.save()
        
    }

    
}

async function removefromcart(userid,productid){
    const product=await cart.findOne({
        userId:userid,
        productId:productid

    })
    if(product){
        const result=await cart.findOneAndDelete({
            userId:userid,
            productId:productid
        })

    }

}


async function getcartproducts(userid){
    const products=await cart.find({
        userId:userid
        }).populate("productId")
    return products.map((x)=>{ return {
        quantity:x.quantity,product:x.productId}
    })
   

}

async function clearcart(userid){
    await cart.deleteMany({
        userId:userid

    })
    
}

module.exports={addtocart,removefromcart,getcartproducts,clearcart}
