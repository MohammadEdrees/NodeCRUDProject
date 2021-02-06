const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title:{
        type: String,
        maxlength:20,
        required:true
    },
    body:{
        type: String,
        maxlength:256,
        required:true
    },
    createTime:{type:Date},
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reactions:[{
        type:String,
        enum:['like','dislike','love','Angery','support']
    }]

   
});
const postModel = mongoose.model('Post',postSchema);
module.exports=postModel;

