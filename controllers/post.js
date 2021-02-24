const Post = require('../models/Post');



const mongoose = require('mongoose');

//Create blog--------------------------------------//
const create=(post)=>{return Post.create(post);}
//const createComment=(comment)=>{return Comment.create(comment);}

//get All blogs--------------------------//
const getAll=()=>Post.find({}).exec();
//get one by id --------------------------//
const getById=(id)=>Post.findById(id).exec();
//editOne--------------------------------------//
const edit =(id,body)=>Post.findByIdAndUpdate(id,body,{ new:true}).exec();
//delete by id -----------------------------------------//
const deletP =(id)=>Post.findByIdAndDelete(id,{ new:true}).exec();
//PostsOfOneUser
const getAlll = (query) => Post.find(query).exec();
//comments
const postComment =(blogid, comment) => Post.findByIdAndUpdate(blogid, { $addToSet: { comments: comment} }, { new: true }).exec();
module.exports={
    create,getAll,getById,edit,deletP,getAlll,postComment
}