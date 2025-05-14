const express=require("express")
const router=express.Router();

const {addproduct,getproducts,getproductById,updateproductById,deleteproduct}=require('./../Handlers/producthandler.js')

router.post("",async(req,res)=>{
    let model=req.body;
    let result=await addproduct(model);
    res.send(result);
    

})

router.get("",async(req,res)=>{
    let result=await getproducts();
    res.send(result);

})

router.get("/:id",async(req,res)=>{
    let model=req.body;
    let id=req.params['id']
    let result=await getproductById(id);
    res.send(result);

})

router.put("/:id",async(req,res)=>{
    let model=req.body;
    let id=req.params['id']
    let result=await updateproductById(id,model);
    res.send({message:"Updated"});

})

router.delete("/:id",async(req,res)=>{
    let id=req.params['id']
    let result=await deleteproduct(id);
    res.send({message:"Deleted"});

})


module.exports=router;
