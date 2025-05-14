const order=require('../models_db/order')
const {clearcart}=require('./cart-handler')
async function addorder(userid,orders){
    const result=new order({
        userId:userid,
        status:"InProgress",
        ...orders
    })
    await result.save()
    await clearcart(userid)

    return result
    
}

async function getorder(userid){
    const result=await order.find({
        userId:userid
    })
    return result
}

async function getorderById(orderid){
    const result=await order.findOne({
        _id:orderid
    })
    return result
}




module.exports={addorder,getorder,getorderById}

