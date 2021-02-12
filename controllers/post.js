const Post = require('../models/Post');
//Create blog--------------------------------------//
const create=(post)=>{return Post.create(post);}
//get All blogs--------------------------//
const getAll=()=>Post.find({}).exec();
//get one by id --------------------------//
const getById=(id)=>Post.findById(id).exec();
//editOne--------------------------------------//
const edit =(id,body)=>Post.findByIdAndUpdate(id,body,{new:true}).exec();
//delete by id -----------------------------------------//
const deletP =(id)=>Post.findByIdAndRemove(id).exec();
//PostsOfOneUser
//const currentUposts=(id)=>Post.find({ 'userId': id }).exec();

module.exports={
    create,getAll,getById,edit,deletP
}