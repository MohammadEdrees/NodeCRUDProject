const express = require('express');
const post = require('./post');
const user = require('./user');
const authMiddleware=require('../middelwares/auth');
// const cors = require('cors');
const router = express.Router();
//auth =>Post
router.use('/posts',authMiddleware,post);
router.use('/users',user);


module.exports=router;
