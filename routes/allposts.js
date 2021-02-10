const express = require('express');
const {  getAll } = require('../controllers/post');

router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json(posts);
    } catch (err) {
       // next(err);
       res.json("Error in load posts ..");

    };

});