const jwt=require('jsonwebtoken');

function verifytoken(req,res,next){
    const token=req.header("Authorization");
    if(!token){
        return res.status(401).send({
            error:"acessed denied"
        })
    }
    try{
        const decode=jwt.verify(token,"SECRET");
        console.log(decode)
        req.user=decode
        next();
    }catch(error){
        return res.status(401).send({
            error:"Invalid token"
        })
    }
}

function isAdmin(req,res,next){
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return res.send({
            error:"Forbidden"
        })
    }

}

module.exports={verifytoken,isAdmin};