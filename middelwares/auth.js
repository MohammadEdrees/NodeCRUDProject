const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const asyncVerify=promisify(jwt.verify);//transform to promise
const auth = async (req,res,next)=>{
    const { headers: { authorization } } =req;
    if(!authorization){
        next((new Error('UN_AUTHENTICATED')));
    }
    try{
    const id =  await asyncVerify(authorization,'SECRET_MUST_BE_COMPLEX');
    const user = user.findById(id);
    console.log("verified user");
    req.user=user; //fixed 
    //if success next
    res.json(user);
        next();
    } catch(err){
        console.log("verified user");
        next((new Error('UN_AUTHENTICATED')));
    }

};
module.exports=auth;
//verify jwt