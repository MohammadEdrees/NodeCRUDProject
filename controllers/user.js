const User = require('../models/User');
const jwt = require('jsonwebtoken');
const create =(user)=>{
return User.create(user);
}
const getAllUsers=()=>User.find({});
const editOne=(id,data)=>User.findByIdAndUpdate(id,data,{ new: true }).exec();
const {promisify}=require('util');
const asyncSign=promisify(jwt.sign);
const login= async ({ username,password })=>{
const user = await User.findOne({ username }).exec();
if(!user){
    throw Error('UN_AUTHENTICATED');
}

const isValidePass= user.validatePassword(password);

if(!isValidePass){
    throw Error('UN_AUTHENTICATED');
}
const token = await asyncSign({
    username: user.username
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '2d' });

return { ...user.toJSON(), token};
//return user;
}

module.exports={
    create,getAllUsers,login,editOne
}