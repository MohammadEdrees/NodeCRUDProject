const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    //mail required
    mail:{
        type: String,
        unique:true,
        maxlength:20,
        required:true
    },
    username:{
        type: String,
        unique:true,
        maxlength:140
       
    },
    password:{
        type: String,
        required:true
    },
    firstname:{
        type: String,
        maxlength:20
       
    },
    lastname:{
        type: String,
        maxlength:20     
    },
    dop:{
        type:Date,
        default:null
    },
    logindate:{
        type:Date,
        default:Date.now
    },
    posts:[{type:Schema.Types.ObjectId , default: "null"}],
    //with no test 1:
    following:[{ type:Schema.Types.ObjectId,ref:'User' }],
    followers:[{ type:Schema.Types.ObjectId,ref:'User' }]
    
    
      
});

userSchema.pre('save',function preSave(next){
    this.password=bcrypt.hashSync(this.password,8);
    next();
});

userSchema.pre('findOneAndUpdate',function preSave(next){
    if(!this._update.password){return;}
    this._update.password=bcrypt.hashSync(this._update.password,8);
    next();
});

userSchema.methods.validatePassword = function(password){
return bcrypt.compareSync(password,this.password);

}

const userModel = mongoose.model('User',userSchema);
module.exports=userModel;
//change