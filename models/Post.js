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
    createTime:{type:Date , default:Date.now },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    likes:{
     type:Number,
     default:0
    },
    hidden:
    {
        type:Boolean,
        default:false
    },
    img:{
        type:String,
        default:"URL"
    }



   
});
const postModel = mongoose.model('Post',postSchema);
module.exports=postModel;

