const express = require('express');
const { create, getAll, getById, edit, deletP } = require('../controllers/post');
const authMiddleware = require('../middelwares/auth');
const multer = require('multer');
//const path = require('path');
const file = require('../images');
const router = express.Router();
//--------------------------------------
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
const upload = multer({
    storage: storage
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
router.post('/', authMiddleware,upload.single(' images '), async (req, res, next) => {
    try {
        const { body, user } = req;
       // const filename=req.file.filename;
        const path = req.file.path;
        const post = await create({ ...body, userId: user.id ,img: path }); 
        const postId = post.id;
        user.posts.push(postId);
        
        res.json({'message': 'File uploaded'}); 
        
        //res.json(post); 
            

    } catch (e) {
        res.json({ case7: "out of post area" });
        next(e);
    }

});

//--get Blog with id 
router.get('/:id',authMiddleware, async (req, res, next) => {
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
router.patch('/:id',authMiddleware, async (req, res, next) => {
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
router.delete('/:id',authMiddleware, async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const deleted = await deletP(id);
        res.send(deleted + " deleted ");

    } catch (err) {
        next(err);
    };


});
module.exports = router 