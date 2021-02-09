const express = require('express');
const { create, getAll, getById, edit, deletP } = require('../controllers/post');
const authMiddleware=require('../middelwares/auth');

const router = express.Router();

router.post('/',authMiddleware, async (req, res, next) => {
    const {body , user:{ id } } = req;
   try{
   // const { body } = req;
   // user id in the blog 
    const post = await create({...body, userId: id });
    res.json(post);
   }catch(e){
    next(e);
   }

});

router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json(posts);
    } catch (err) {
       // next(err);
       res.json("Error in load posts ..");

    };



});

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