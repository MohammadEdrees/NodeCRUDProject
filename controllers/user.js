const User = require('../models/User');
const jwt = require('jsonwebtoken');
// create user
const create = (user) => { return User.create(user); }
//--------------------------------------------------------------------------
//Follow
const follow = (userid, followid) => {
    User.findByIdAndUpdate(userid, { $addToSet: { following: followid } }, { new: true }).exec()
    User.findByIdAndUpdate(followid, { $addToSet: { follower: userid } }, { new: true }).exec()
    return ("status:followed");
}
//-------------------------------------------------------------------------------------

//unfollow
const unfollow = (userid, followid) => {
    User.findByIdAndUpdate(userid, { $pull: { following: followid } }, { new: true }).exec()
    User.findByIdAndUpdate(followid, { $pull: { follower: userid } }, { new: true }).exec()
    return ("status:unfollowe");
}
//-------------------------------------------------------------------------------------------

//allfollowers
const getfollowers = async (id) => {
    const { followers } = await getById(id)
    return User.find().where('_id').in(followers).exec();
}
//-------------------------------------------------------------------

//this=>followers
const getfollowing = async (id) => {
    const { following } = await getById(id)
    return User.find().where('_id').in(following).exec();
}
//-----------------------------------------------------------------------------
// get by id 
const getById = (id) => User.findById(id).exec();
//------------------------------------------------------------------
//get all 
const getAllUsers = () => User.find({});
//------------------------------------------------------------------------
// update data
const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();
//---------------------------------------------------------------------------------------
//token
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
const login = async ({ mail, password }) => {
    const user = await User.findOne({ mail }).exec();
    if (!user) {
        throw Error('UN_AUTHENTICATED');
    }
    //pass auth 
    const isValidePass = user.validatePassword(password);

    if (!isValidePass) {
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        mail: user.mail,
        password: user.password
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '10d' });

    return { ...user.toJSON(), expiresIn, token };
    //return user;
}
//-------------------------------------------------------------------------------------------
//Export
module.exports = {
    create,
    getAllUsers,
    login,
    editOne,
    getById,
    follow,
    unfollow,
    getfollowers,
    getfollowing

}