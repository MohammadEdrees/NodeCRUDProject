const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
authorName:{
    type: String,
    maxlength:100,
    default:null

},
body:{
    type: String,
    maxlength:200,
    default:null

},
createTime:{type:Date , default:Date.now },
userId:{
    type: Schema.Types.ObjectId,
    ref:'User',
    default:null
},
postId:{
    type: Schema.Types.ObjectId,
    ref:'Post',
    default:null
}

})
const commentModel = mongoose.model('Comment',postSchema);
module.exports=commentModel;
