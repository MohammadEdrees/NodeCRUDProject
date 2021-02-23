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
<<<<<<< HEAD
//-----------------------------------------------
const deletee = (id) => User.findByIdAndRemove(id).exec();
=======
>>>>>>> parent of 6a1e5c8 (Merge branch 'master' of https://github.com/MohammadEdrees/NodeCRUDProject)
//token ----------------------------------------------
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
//------------------------------------------------------------------

//login
const login = async ({ mail, password }) => {
    let user = await User.findOne({ 'mail' : mail }).exec();

    if (!user) {
        throw Error('UN_AUTHENTICATED'); 
    }

    const isValidePass = user.validatePassword(password); //always false
    // return user ;
    if ( !isValidePass) {
        //  throw Error('UN_AUTHENTICATED');
    } 
    
    let token = await asyncSign({
        mail: user.mail,
<<<<<<< HEAD
        password: user.password
        //id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX_2', { expiresIn: 1000 * 60 * 60 * 24 * 30 });
    
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoieHl6QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDA4JGVuazFkTU8vSTNBSmtZWDhSQnJRU2VtYkFjYTkucUt5dUlvWlVCTm12UG5nWXhqbnUzVU1lIiwiaWF0IjoxNjE0MDgwNTMyLCJleHAiOjQyMDYwODA1MzJ9.fsR3amGhxWL2mkV87a5rQKmNTbHYjBxOoJ_CtZrlvM8";
    return { ...user.toJSON(), token };


=======
        password: user.password,
        id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '99999999999999999999999999999999999' });

    const refreshToken = await asyncSign({
        mail: user.mail,
        password: user.password,
        id: user.id,
    }, 'REFRESH', { expiresIn: '999999999999999999999999999999999999' });
>>>>>>> parent of 6a1e5c8 (Merge branch 'master' of https://github.com/MohammadEdrees/NodeCRUDProject)

    // const refreshToken = await asyncSign({
    //     mail: user.mail,
    //     password: user.password,
    //     id: user.id
    // }, 'REFRESH', { expiresIn: '1y' });


<<<<<<< HEAD
    //res.json(user);
    //return user;
    // return { ...user.toJSON(), token };
    // return { user, token };

=======
    //res.json('6');
    res.json(user);
    //return { ...user.toJSON(), token, refreshToken };
>>>>>>> parent of a11f4b8 (22)


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
<<<<<<< HEAD
    getfollowing,
    deletee

=======
    getfollowing
    
>>>>>>> parent of 6a1e5c8 (Merge branch 'master' of https://github.com/MohammadEdrees/NodeCRUDProject)
};