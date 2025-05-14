const express=require("express");
const router=express.Router();
const Category=require("./../models_db/category");
const {addcategory,updatecategory,deletecategory,getcategories,getCategoryById}=require("./../Handlers/category-handler")
router.post("",async(req,res)=>{
    let model=req.body;
    let  result=await addcategory(model);
    res.send(result);
    /*let category=new Category({
        name: model.name,
        
    })
    await category.save()
    res.send(category.toObject());*/
})
router.get("",async(req,res)=>{
    let result=await getcategories();
    res.send(result);
    
})
router.get("/:id",async(req,res)=>{
    let id=req.params['id'];//another method req.params['id']||parseInt(req.params.id);
    let result=await getCategoryById(id);
    res.send(result);
})

router.put("/:id",async(req,res)=>{
    let model=req.body;
    let id=req.params['id'];//another method req.params['id']||parseInt(req.params.id);
    await updatecategory(model,id);
    res.send({message:"updated"});
})

router.delete("/:id",async(req,res)=>{
    let id=req.params['id'];//another method req.params['id']||parseInt(req.params.id);
    await deletecategory(id);
    res.send({message:"deleted"});
})

module.exports=router;