const Post = require('../models/Post');


const create=(post)=>{
return Post.create(post);
}

const getAll=()=>Post.find({}).exec();

const getById=(id)=>Post.findById(id).exec();

const edit =(id,body)=>Post.findByIdAndUpdate(id,body,{new:true}).exec();

const deletP =(id)=>Post.findByIdAndRemove(id).exec();

module.exports={
    create,getAll,getById,edit,deletP
}