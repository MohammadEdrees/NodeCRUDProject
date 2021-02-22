const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    authorName: {
         type: String,
          required: true 
    },
    body: {
        type: String,
        maxlength: 1024,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
});
const postModel = mongoose.model('Comment',postSchema);
module.exports=postModel;