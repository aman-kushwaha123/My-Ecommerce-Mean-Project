const Category=require("./../models_db/category");

 async function addcategory(model){
    let category= new Category({
        name: model.name,
        
    })
    await category.save()
    return category.toObject();

}

async function getcategories(){
    let categories=await Category.find();
    return categories.map(c=>c.toObject());
}
async function getCategoryById(id){
    let categories=await Category.findById(id);
    return categories.toObject();
}

async function updatecategory(model,id){
    //another method req.params['id']||parseInt(req.params.id);
    await Category.findOneAndUpdate({_id:id},model);
    return;
}
async function deletecategory(id){
    
    return await Category.findByIdAndDelete(id);

}


module.exports={addcategory,updatecategory,deletecategory,getcategories,getCategoryById}