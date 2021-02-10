const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const User  = require('../models/User.js');
const asyncVerify=promisify(jwt.verify);//transform to promise

const auth = async (req,res,next)=>{
    
    const { headers: { authorization } } =req;
    if(!authorization){
        //next((new Error('UN_AUTHENTICATED')));
        res.json({msg:"Not login "});
    }
    try{
    const id =  await asyncVerify(authorization,'SECRET_MUST_BE_COMPLEX');
   // res.json({case1:" line 13 ok"});
   // const user = await User.findById(id).exec();
   // res.json({case2:" line 15 ok"});
    //req.user=user; //fixed 
   //  res.json({user});
    res.json({case3:" line 18 ok"});

    next();
    }catch(e){
      //  next((new Error('UN_AUTHENTICATED')));
      res.json({msg:"login but cant access ",err: e.msg});

    }
};
module.exports=auth;
//verify jwt