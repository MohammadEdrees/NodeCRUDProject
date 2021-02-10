const express = require('express');
const { create, getAllUsers, login, editOne, getById} = require('../controllers/user');
const authMiddleware = require('../middelwares/auth');
const User = require('../models/User');

const router = express.Router();

//--registeration---------------------------------------------------------------------//
router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user);
        }
     catch (err) {next(err);}
});
//--getAll-users--------------------------------------------------------------------//
router.get('/',authMiddleware, async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.json(allUsers);
        } 
    catch (err) {next(err);}
});
//get--user--by-id--------------------------------------------------------------------//
router.get('/:id',authMiddleware, async (req, res, next) => {
    try {
        const users = await getById(req.params.id);
        res.json(users);
    } 
    catch (err) {next(err);}
});
//Login--------------------------------------------------------------------------------------------------//
router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user);
       
    } catch (err) {
        next(err);
    }
});
//Edit user---------------------------------------------------------//
router.patch('/:id',authMiddleware, async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const users = await editOne(id, body);
        res.json(users);
    } catch (err) {
        next(err);
    }
});

//follow----------------------------------------------------------------//
router.post("/follow/:id", authMiddleware, (req, res, next) => {
    if (req.user.id === req.params.id) {
        return res.status(400).json({ alreadyfollow: "You cannot follow yourself" })
    }


    User.findById(req.params.id)
        .then(user => {
            console.log(user)
            // check if the requested user is already in follower list of other user then 
            if (user.followers.filter(follower =>
                follower.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyfollow: "You already followed the user" })
            }
            res.json({case:"Passed"})
            User.followers.unshift({ user: req.user.id });
            User.save()
            User.findOne({ mail: req.user.mail })
                .then(user => {
                    console.log(user)
                    user.following.unshift({ user: req.params.id });
                    user.save().then(user => res.json(user))
                })
                .catch(err => res.status(404).json({ alradyfollow: "you already followed the user" }))
        })

})

//unfollow-----------------------------------------------------------------------------------------//
router.put('/unfollow/:unfollowId', authMiddleware, (req, res) => {
    User.findByIdAndUpdate(req.params.unfollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.params.unfollowId }

        }, { new: true }).select("").then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })

    })
});



module.exports = router;
