const express=require("express")
const Product=require('./../models_db/product')

async function addproduct(model){
    let product=new Product({
      ...model//spread operator
   
    })
    await product.save()
    return product.toObject();
    }
async function getproducts(){
    let result=await Product.find();

    return result.map(x=>x.toObject());
}


async function getproductById(id){
    let result=await Product.findById(id);
    return result.toObject();
}

async function updateproductById(id,model){
    await Product.findByIdAndUpdate({_id:id},model)
   return;

}

async function deleteproduct(id){
    await Product.findByIdAndDelete(id)
    return;

}

async function getNewproduct(){
    let result=await Product.find({
        isNewproduct:true,
        
    })
    return result;
}

async function getfeatured(){
    let result=await Product.find({
        isfeatured:true
    })
    return result;
}

async function getproductforlisting(searchterm,categoryid,page,pagesize,sortBy,sortOrder,brandid){
     
    
    
    if(!sortBy){
        sortBy='price'
    }
    if(!sortOrder){
       sortOrder = -1
    }
    const queryFilter={}
    if(categoryid){
        queryFilter.categoryid=categoryid
    }
    if(searchterm){
        queryFilter.$or=[
            {
                name:{$regex:new RegExp('.*'+searchterm+'.*',"i")}
            },{
                shortdescription:{$regex:'.*'+searchterm+'.*'}
            }
        ]
    }
    
    if(brandid){
        queryFilter.brandid=brandid
    }
    
    const products=await Product.find(queryFilter).sort({
        [sortBy]:+sortOrder
    }).skip((+page-1)*+pagesize).limit(+pagesize);
    return products.map(x=>x.toObject());
    

}

async function getproductsByBrand(id){
    const result=await Product.find({
        brandid:id
    })
    
    return result.map(x=>x.toObject())
}

module.exports={addproduct,getproducts,getproductById,updateproductById,deleteproduct,getNewproduct,getfeatured,getproductforlisting,getproductsByBrand};
 