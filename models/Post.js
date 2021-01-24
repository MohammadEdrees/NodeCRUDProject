const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    
    body:{
        type: String,
        maxlength:256,
        required:true
    },
    createTime:{type:Date},
    updateTime:{type:Date},
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reactions:{
        type:String,
        enum:['liked','disliked'],
    }
});
const postModel = mongoose.model('Post',postSchema);
module.exports=postModel;