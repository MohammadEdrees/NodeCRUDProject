const express = require('express');
const post = require('./post');
const user = require('./user');
//const allposts = require('./allposts');

const authMiddleware=require('../middelwares/auth');

const router = express.Router();
//auth =>Post
router.use('/posts',post);
router.use('/users',user);
//router.use('/allposts',allposts);



module.exports=router;
