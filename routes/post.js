const express = require('express');
const { create, getAll, getById, edit, deletP,getAlll } = require('../controllers/post');
const authMiddleware = require('../middelwares/auth');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mongoose = require('mongoose');

//--------------------------------------

cloudinary.config({
    cloud_name: 'dc42zftko',
    api_key: '311751364261898',
    api_secret: 'OsKUzsu6eV0braFO_sPUIOu_WNE'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'images',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
});
const parser = multer({ storage });


//
router.post('/image', parser.single('image'), async (req, res, next) => {
    res.json(req.file);
})



//------------------------------------------------------------
//--All-posts--
router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json(posts);
    } catch (err) {
        // next(err);
        res.json("Error in load posts ..");
    };

});

//--Add--Blog----------------------------------------------------
router.post('/', authMiddleware, parser.single('img'), async (req, res, next) => {
    try {
        // Data from  angular 
        var { body, user } = req;

        // request Content
        const post = await create({ ...body, userId:user._id, img: req.file.path });
        // save in mongoose
       const postId = post.id;
       user.posts.push(postId);
       user.save();
        // set post id => user 
        res.json({ posts: post });


    } catch (e) {
        
        next(e);
    }

});

//--get Blog with id 
router.get('/:id', async (req, res, next) => {
    // const { params:{ id } } = req;
    try {
        const updateOne = await getById(req.params.id);
        res.json(updateOne);

    } catch (err) {
        console.log(err);
        next(err);
    };


});

//--modify Blog with id 
router.put('/:id', authMiddleware,parser.single('img'), async (req, res, next) => {
    const { params: { id }, body , file } = req;
    //img = { file };
    try {
        const specificPost = await edit( id , body);
        res.json("seccess");

    } catch (err) {
        console.log(err);
        next(err);
    };
});

// delete Blog with id 
router.delete('/:id', authMiddleware, async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const deleted = await deletP(id);
        res.send(deleted + " deleted ");

    } catch (err) {
        next(err);
    };


});

// get current user blogs 
router.post('/post', authMiddleware , async(req, res, next) => {
     const { user: { id } } = req;   
    try {
       const blogs = await getAlll( { userId: id} );
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});

//Comments for specific Post 
// router.post('/post/:id/comment',authMiddleware,async(req,res)=>{

// });
//comment
// router.post('/comments/:blogid',auth, async (req, res, next) => {
//     const { user:{id, firstName, lastName} ,params: {blogid}, body } = req;
//     try{
//       const comment=await postComment(blogid,{ ...body, author: id , authorName: firstName+""+lastName});
//       res.json(comment);
//       }catch(e){
//       next(e);
//       }
//   });
module.exports = router 