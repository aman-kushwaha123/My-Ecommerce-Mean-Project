const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const {addproduct,getproducts,getproductById,updateproductById,deleteproduct,getNewproduct,getfeatured,getproductforlisting,getproductsByBrand}=require('./../Handlers/producthandler.js');
const { getcategories } = require("../Handlers/category-handler.js");
const { getBrands } = require("../Handlers/brandhandler.js");
const {addwishlist,removewishlist,getwishlist}=require("../Handlers/wishlist-handler")
const {addtocart,removefromcart,getcartproducts}=require("../Handlers/cart-handler");
const { addAdd,deleteadd,updateadd,getAdd } = require("../Handlers/address-handler.js");
const { addorder, getorder,getorderById } = require("../Handlers/order-handler.js");
const {registerUser,loginUser,updatename,getname}= require("../Handlers/auth-handler");
router.get("/new-products",async function(req,res){
    let result=await getNewproduct();
    res.send(result.map(x=>x.toObject()));
})

router.get("/featured-products",async function(req,res){
    let result=await getfeatured();
    res.send(result.map(x=>x.toObject()));

})

router.get("/categories",async function(req,res){
    let result=await getcategories();
    res.send(result);
})

router.get("/brands",async function(req,res){
    let result=await getBrands();
    res.send(result);
})

router.get("/products",async function(req,res){
    const {searchterm,categoryid,page,pagesize,sortBy,sortOrder,brandid}=req.query
   
    let result=await getproductforlisting(searchterm,categoryid,page,pagesize,sortBy,sortOrder,brandid);
    
   
    res.send(result)
})

router.get("/products/:id",async(req,res)=>{
    const id=req.params['id']
    const product=await getproductById(id)
    res.send(product)
})

router.get("/product/:id",async(req,res)=>{
    const id=req.params['id']
    console.log(id)
    const result=await getproductsByBrand(id)
    res.send(result)
})

router.post("/wishlist/:id",async(req,res)=>{
    const user=req.user
    const productid=req.params.id
    const result=await addwishlist(user._id,productid)
    res.send({
        message:"added to wishlist"
    })
})

router.get("/wishlist",async(req,res)=>{
    const user=req.user
    const productid=req.params.id
    const result=await getwishlist(user._id)
    res.send(result)
})

router.delete("/wishlist/:id",async(req,res)=>{
    const user=req.user
    const productid=req.params.id
    const result=await  removewishlist(user._id,productid)
    res.send({
        message:"deleted"
    })

})

router.post("/cart/:id",async(req,res)=>{
    const user=req.user
    const productid=req.params.id
    const quantity=(req.body.quantity)
    console.log(quantity)
    const result=await addtocart(user._id,productid,quantity)
   
    res.send({
        message:"Added to cart"
    })
})

router.delete("/cart/:id",async(req,res)=>{
    const user=req.user
    const productid=req.params.id
    const result=await removefromcart(user._id,productid)
   
    res.send({
        message:"deleted from cart"
    })
})

router.get("/cart",async(req,res)=>{
    const user=req.user
    const model=req.body
    const result=await getcartproducts(user._id)
    res.send(result)
})


router.post("/address/add",async(req,res)=>{
    const user=req.user
    const model=req.body
    try{
    const result=await addAdd(user._id,user.name,model);
    res.send(result)
    }
    catch(error){
        res.send({message:"You Might have entered Duplicate Data"})
    }
    
    
})

router.put("/address/update",async(req,res)=>{
    const user=req.user
    const model=req.body
    const result=await updateadd(user._id,model);
    res.send({message:' Address Updated'})
})
router.delete("/address/delete",async(req,res)=>{
    const user=req.user
    const result=await deleteadd(user._id);
    res.send(result)
})
router.get("/address",async(req,res)=>{
    const user=req.user
    const result=await getAdd(user._id);
    res.send(result)
})
router.get("/order",async(req,res)=>{
    const user=req.user
    const result=await getorder(user._id)
    res.send(result)
})

router.post("/order/add",async(req,res)=>{
    const user=req.user
    const orders=req.body
    const result=await addorder(user._id,orders)
    res.send(result)
      
})
router.get("/order/:id",async(req,res)=>{
    const id=req.params.id
    const user=req.user
    const result=await getorderById(id)
    res.send(result)
})

router.put('/update',async(req,res)=>{
    const user=req.user
    const name=req.body
    const result=await updatename(user._id,name)
    res.send(result)
})
router.get('/username',async(req,res)=>{
    const user=req.user
    const result=await getname(user._id)
    res.send(result)
})









module.exports=router;