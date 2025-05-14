const address=require("../models_db/address")

async function addAdd(userid,username,model){
    const result=new address({
         userId:userid,
         UserName:username,
          ...model
    })
    await result.save()
   return result
}

async function deleteadd(userid){
    const result=await address.deleteMany({
          userId:userid
    })
   return result
}

async function updateadd(userid,model){
    const result=await address.findOneAndUpdate({userId:userid},model)
    return result
}


async function getAdd(userid){
    const result=await address.find({
          userId:userid
    })

   return result
}

module.exports={addAdd,deleteadd,updateadd,getAdd}





