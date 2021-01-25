const express = require('express');
const post = require('./post');
const user = require('./user');
const authMiddleware=require('../middelwares/auth');

const router = express.Router();

router.use('/posts',authMiddleware,post);
router.use('/users',user);


module.exports=router;
