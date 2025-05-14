const mongoose=require('mongoose')
const order=require('../models_db/order.js')

async function updateStatus(id,status){
    const result=await order.findByIdAndUpdate(id,{
        status:status
    })
    return result
}

async function updatecharges(id,charges){
    const result=await order.findByIdAndUpdate(id,charges)
    return (result)
}

module.exports={updateStatus,updatecharges}