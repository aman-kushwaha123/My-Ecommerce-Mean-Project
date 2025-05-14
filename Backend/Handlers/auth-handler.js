const User=require('../models_db/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
async function registerUser(model){
    const hashpassword=await bcrypt.hash(model.password,10)
    let user=new User({
        name:model.name,
        email:model.email,
        password:hashpassword,
    })

    await user.save ()
}


async function loginUser(model){
    
    const user=await User.findOne({
        email:model.email,
    })
    let isMatched=await bcrypt.compare(model.password,user.password);
    if(user && isMatched){
        const token=jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,

        },"SECRET",{
            expiresIn:"1hr"
        })
        return {token,user};
    }
    else{
        return 
    }
}

async function getname(id){
      const result=await User.find({
        _id:id
      })
      return result


}

async function updatename(id,name){
    const user=await User.findByIdAndUpdate(id,{
        name:name
    })
    return user
}
module.exports={registerUser,loginUser,updatename,getname};