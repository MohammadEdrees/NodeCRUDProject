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
        const post = await create({ ...body, userId: user.id, img: req.file.path });
        // save in mongoose
        const postId = post.id;
        user.posts.push(postId);
        user.save();
        // set post id => user 
        res.json({ posts: user.posts });


    } catch (e) {
        res.json({ e });
        next(e);
    }

});

//--get Blog with id 
router.get('/:id', authMiddleware, async (req, res, next) => {
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
router.patch('/:id', authMiddleware, async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const specificPost = await edit(id, body);
        res.json(specificPost);

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

router.put('/post', async(req, res, next) => {
    //const { user: { id } } = req;
    const { user: { mail } } = req;
    
    try {
        const blogs = await getAlll( {mail : mail} );
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
// router.put('/post', authMiddleware ,async(req, res, next) => {
//     const { user: { id } } = req;
//     try {
//         const blogs = await getAlll(id);
//         res.json(blogs);
//     } catch (e) {
//         next(e);
//     }
// });

// router.get('/posts/:uid', async (req,res)=>{
//     try{
//     const result =  await currentUposts(req.params.uid);   
//     res.json(result);
//     }catch(e){
//     res.json({e});
    
//     }
// })


// User's Blogs
// router.get('/post/:userid', authMiddleware , async (req, res, next) => {
//     const currenUser =req.params.id;
//     const result = await currentUposts(currenUser);
//     res.json(result);

// })
// router.get('/post/:userid', function(req, res,next) {
//     Post.find({userId: req.params.id}, (err, res) => {
//        if(err) {
//          console.log(err);
//        } else {
//          res.json(req.posts);
//        }
//     });
// });//

module.exports = router 