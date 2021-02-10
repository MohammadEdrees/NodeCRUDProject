const express = require('express');
const getAll = require('../controllers/post');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json(posts);
    } catch (err) {
       // next(err);
       res.json("Error in load posts ..");

    };

});
module.exports=router;
