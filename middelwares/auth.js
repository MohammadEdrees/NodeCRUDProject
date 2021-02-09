const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const User  = require('../models/User.js');
const asyncVerify=promisify(jwt.verify);//transform to promise
const auth = async (req,res,next)=>{
    const { headers: { authorization } } =req;
    if(!authorization){
        console.log("non verified user");
        next((new Error('UN_AUTHENTICATED')));
    }
    
    const id =  await asyncVerify(authorization,'SECRET_MUST_BE_COMPLEX');
    const user = await User.findById(id).exec();
    console.log("verified user");
    req.user=user; //fixed 
    //if success next
    console.log(" verified user");
    res.json(user);
        next();
        //next((new Error('UN_AUTHENTICATED')));
    

};
module.exports=auth;
//verify jwt