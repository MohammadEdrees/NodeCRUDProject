const express = require('express');
const { create, getAllUsers, login, editOne, getById ,deletee } = require('../controllers/user');
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
    catch (err) { next(err); }
});
//--getAll-users--------------------------------------------------------------------//
router.get('/', authMiddleware, async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        res.json(allUsers);
    }
    catch (err) { next(err); }
});
//get--user--by-id--------------------------------------------------------------------//
router.get('/:id', authMiddleware, async (req, res, next) => {
    try {
        const users = await getById(req.params.id);
        res.json(users);
    }
    catch (err) { next(err); }
});
//Login--------------------------------------------------------------------------------------------------//
router.post('/login', async(req, res, next) => {
    const { body } = req;
    try {
        const user = await login( body );//issue got it 
     //   res.json({user : user});
    } catch (err) {
      //next(err);
     res.json({error: err.message});
    }
});
//Edit user---------------------------------------------------------//
router.patch('/:id', authMiddleware, async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const users = await editOne(id, body);
        res.json(users);
    } catch (err) {
        next(err);
    }
});

//follow----------------------------------------------------------------//
router.post("/follow/:id", authMiddleware, (req, res) => {
    const currentUserId=req.user.id;
    const targetTobeFollowedId=req.params.id;

    if (currentUserId === targetTobeFollowedId) {
        return res.json({ alreadyfollow: "You cannot follow yourself" });
    }
    User.findById({ _id: targetTobeFollowedId })
        .then(user => {
            if (user.followers.includes(currentUserId) ) {
                return res.json({ alreadyfollow: "You already followed Him" });
            }
            user.followers.unshift({ _id : currentUserId });
            user.save();
            User.findById({ _id : currentUserId })
                .then(user => {
                    user.following.unshift({ _id : targetTobeFollowedId });
                    user.save().then(user => res.json(user))
                })
                .catch(err => res.json({ alradyfollow: "Done" }))
        })

})

//unfollow-----------------------------------------------------------------------------------------//
router.post("/unfollow/:id", authMiddleware, (req, res) => {
    const currentUserId=req.user.id;
    const targetTobeFollowedId=req.params.id;

    if (currentUserId === targetTobeFollowedId) {
        return res.json({ alreadyfollow: "its you " });
    }
    //-----------------------------------------------
    User.findById({ _id: targetTobeFollowedId })
        .then(user => {
            if (user.followers.includes(currentUserId) ) {
                user.followers.shift(currentUserId);
                res.json("removed from followers")
            }
            user.followers.shift({ _id : currentUserId });
            user.save();
            User.findById({ _id : currentUserId })
                .then(user => {
                    user.following.shift({ _id : targetTobeFollowedId });
                    user.save().then(user => res.json(user))
                })
                .catch(err => res.json({ alradyfollow: "removed from follwoing " }));
        })
    

})







// router.post('/unfollow/:id', authMiddleware, (req, res) => {
//     const { user, params:{ id } }=req
//     const currentUser= user.id;
//     const FollowedOne= id ;
//     //check i is not my id
//         if(user.following.includes(FollowedOne)){
//             //unfollow
//              let index =  user.following.indexOf(FollowedOne);
//              let index2 =  FollowedOne.following.indexOf(user);
//              user.following.splice(index,1);
//              res.json(user.following);
//             //update
//             //save
//         }else{
//             res.json({msg:"err in deleting follwing user"});
//         }
//         User.findById({ _id : FollowedOne }).then(one=>{
//             if(one.followers.includes(currentUser)){
//                 one.followers.splice(index2,1);
//                 res.json(one.followers);
//             }
//         }).catch(e=>{res.json("err in deleting follower")});
    
    //else cheer him 
    
    // User.findByIdAndUpdate(req.params.unfollowId, {
    //     $pull: { followers: req.user._id }
    // }, {
    //     new: true
    // }, (err, result) => {
    //     if (err) {
    //         return res.status(422).json({ error: err })
    //     }
    //     User.findByIdAndUpdate(req.user._id, {
    //         $pull: { following: req.params.unfollowId }

    //     }, { new: true }).select("").then(result => {
    //         res.json(result)
    //     }).catch(err => {
    //         return res.status(422).json({ error: err })
    //     })

    // })

//--delete-------------------------------------//
router.delete('/:id',authMiddleware, async(req,res)=>{
    const { params: { id } } = req;
try{
    const deleted = await deletee(id);
    res.json(deleted + " deleted ");
}catch(e){res.json(e)}
})

module.exports = router;
