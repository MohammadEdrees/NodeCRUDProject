const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User.js');
const asyncVerify = promisify(jwt.verify); //transform to promise

const auth = async(req, res, next) => {
    // try spread it ...auth = > { Access token - refresh token }
    const { headers: { authorization } } = req;
    if (!authorization) {
        next((new Error('UN_AUTHENTICATED')));
       // res.json({ msg: "Confirm You Are Logged in Please.." });
    }
    try {
        const { id } = await asyncVerify(authorization, 'SECRET_MUST_BE_COMPLEX');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
    } catch (e) {
         next((new Error('UN_AUTHENTICATED')));
        //res.json({ msg: "login but can't access "});

    }
};
module.exports = auth;
//verify jwt