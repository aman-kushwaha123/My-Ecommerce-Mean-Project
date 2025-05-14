const express=require('express')
const router=express.Router()
const {updateStatus,updatecharges}=require('../Handlers/admin-order')

router.put('/order/:id',async(req,res)=>{
    const id=req.params.id
    const status=req.body
    const result=await updateStatus(id,status)
    res.send(result,{message:"status Updated"})

})

router.put('/order/charge/:id',async(req,res)=>{
    const id=req.params.id
    const charges=req.body
    const result=await updatecharges(id,charges)
    res.send(result)
})

module.exports=router