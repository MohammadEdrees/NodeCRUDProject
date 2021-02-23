const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User.js');
const asyncVerify = promisify(jwt.verify); //transform to promise

const auth = async(req, res, next) => {
    const { headers: { Authorization } } = req;
    if (!Authorization) {
        next((new Error('Session expired register plz ')));

    }
    try {
        const { id } = await asyncVerify(Authorization, 'SECRET_MUST_BE_COMPLEX');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
    } catch (e) {
         next((new Error('Faild to generate new token register plz')));


    }
};
module.exports = auth;
//verify jwt