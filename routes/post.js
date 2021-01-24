const express = require('express');
const { create, getAll, getById, edit, deletP } = require('../controllers/post');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { body } = req;

    const post = await create(body);
    res.json(post);


});

router.get('/', async (req, res, next) => {
    try {
        const posts = await getAll();
        res.json(posts);
    } catch (err) {
        next(err);
    };


});

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

router.patch('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const specificPost = await edit(id, body);
        res.json(specificPost);

    } catch (err) {
        console.log(err);
        next(err);
    };


});
router.delete('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const deleted = await deletP(id);
        res.send(deleted + " deleted ");

    } catch (err) {
        next(err);
    };


});
module.exports = router 