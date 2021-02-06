const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        unique:true,
        maxlength:140,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    firstname:{
        type: String,
        maxlength:140,
        required:true,
    }
    
        // toJSON: {
        //     transform: (doc,ret,options)=>{
        //         delete ret.password;
        //         return ret;
        //     },
        // },
});
userSchema.pre('save',function preSave(next){
    this.password=bycrypt.hashSync(this.password,8);
    next();
});

userSchema.pre('findOneAndUpdate',function preSave(next){
    if(!this._update.password){return;}
    this._update.password=bycrypt.hashSync(this._update.password,8);
    next();
});

userSchema.methods.validatePassword = function(password){
return bycrypt.compareSync(password,this.password);
}
const userModel = mongoose.model('User',userSchema);
module.exports=userModel;