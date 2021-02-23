const User = require('../models/User');
const jwt = require('jsonwebtoken');
//create --------------------------------------------------------------
const create = (user) => {
    return User.create(user);
}

//Follow--------------------------------------------------------
const follow = (userid, followid) => {
    User.findByIdAndUpdate(userid, { $addToSet: { following: followid } }, { new: true }).exec()
    User.findByIdAndUpdate(followid, { $addToSet: { follower: userid } }, { new: true }).exec()

    return ("status:followed");
}
//unfollow----------------------------------------------------
const unfollow = (userid, followid) => {
    User.findByIdAndUpdate(userid, { $pull: { following: followid } }, { new: true }).exec()
    User.findByIdAndUpdate(followid, { $pull: { follower: userid } }, { new: true }).exec()
    return ("status:unfollowe");
}
//All Followers ----------------------------------------------------
const getfollowers = async (id) => {
    const { followers } = await getById(id)
    return User.find().where('_id').in(followers).exec();
}
// get this followers ------------------
const getfollowing = async (id) => {
    const { following } = await getById(id)
    return User.find().where('_id').in(following).exec();
}
//-----------------------------------------------
const getById = (id) => User.findById(id).exec();
// All users---------------------------------
const getAllUsers = () => User.find({});
//edit------------------------------------------
const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();
//-----------------------------------------------
const deletee = (id) => User.findByIdAndRemove(id).exec();
//token ----------------------------------------------
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
//------------------------------------------------------------------

//login
const login = async ({ mail, password }) => {
    let user = await User.findOne({ mail }).exec();


    if (!user) {
        throw Error('UN_AUTHENTICATED'); 
    }

    const isValidePass = user.validatePassword(password); //always false
    // return user ;
    if ( !isValidePass) {
          throw Error('UN_AUTHENTICATED');
    } 
    
    let token = await asyncSign({
        mail: user.mail,
        password: user.password
        //  id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX_2', { expiresIn: 1000 * 60 * 60 * 24 * 30 });
    

    return { ...user.toJSON(), token };



    // const refreshToken = await asyncSign({
    //     mail: user.mail,
    //     password: user.password,
    //     id: user.id
    // }, 'REFRESH', { expiresIn: '1y' });


    //res.json(user);
    //return user;
    // return { ...user.toJSON(), token };
    // return { user, token };



}


// Export models
module.exports = {
    create,
    getAllUsers,
    login,
    editOne,
    getById,
    follow,
    unfollow,
    getfollowers,
    getfollowing,
    deletee

};