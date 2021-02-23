const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User.js');
const asyncVerify = promisify(jwt.verify); //transform to promise

const auth = async(req, res, next) => {
    const { headers: { Authorization } } = req;
    if (!Authorization) {
        next((new Error('UN_AUTHENTICATED')));

    }
    try {
        const { id } = await asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
    } catch (e) {
         next((new Error('UN_AUTHENTICATED')));


    }
};
module.exports = auth;
//verify jwt