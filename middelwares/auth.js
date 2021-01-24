const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const asyncVerify=promisify(jwt.verify);
const auth = async (req,res,next)=>{
    const { headers: { authorization } } =req;
    if(!authorization){
        next((new Error('UN_AUTHENTICATED')));
    }
    try{
    const token =  await asyncVerify(authorization,'SECRET_MUST_BE_COMPLEX');
        next();
    } catch(err){
        next((new Error('UN_AUTHENTICATED')));
    }

};
module.exports=auth;