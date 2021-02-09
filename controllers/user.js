const User = require('../models/User');
const jwt = require('jsonwebtoken');

//second change with no test :
const follow=(id)=>{
    if(User.follow.indexOf(id)=== -1){
        User.follow.push(id);
    }
    return User.save();
}

const unfollow=(id)=>{
    User.remove(id);
    return User.save();
}
const isFollowing=(id)=>{
    return User.follow.some((followId)=>{return followId.toString()=== id.toString()})

}
//-----------------------------------------------
const create =(user)=>{
return User.create(user);
}
const getById=(id)=>User.findById(id).exec();
const getAllUsers=()=>User.find({});
const editOne=(id,data)=>User.findByIdAndUpdate(id,data,{ new: true }).exec();
const {promisify}=require('util');
const asyncSign=promisify(jwt.sign);
const login= async ({ mail,password })=>{
const user = await User.findOne({ mail }).exec();
if(!user){
    throw Error('UN_AUTHENTICATED');
}

const isValidePass= user.validatePassword(password);

if(!isValidePass){
    throw Error('UN_AUTHENTICATED');
}
const token = await asyncSign({
    mail: user.mail,
    password: user.password
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '10d' });

return { ...user.toJSON(), token};
//return user;
}

module.exports={
    create,getAllUsers,login,editOne,getById,follow
}