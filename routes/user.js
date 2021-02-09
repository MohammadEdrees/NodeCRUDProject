const express = require('express');
const {create,getAllUsers,login,editOne,getById,follow} =  require('../controllers/user');
const authMiddleware=require('../middelwares/auth');

const router = express.Router();

router.post('/', async(req,res,next)=>{
    const { body }=req;
    try{
        const user = await create(body);
        res.json(user);
    }catch(err){
        next(err);
    }
});

router.get('/', async(req,res,next)=>{
    try{
        const allUsers = await getAllUsers();
        res.json(allUsers);
    }catch(err){    
        next(err);
    }
});
router.get('/:id', async(req,res,next)=>{
    try{
        const users = await getById(req.params.id);
        res.json(users);
    }catch(err){
        next(err);
    }
});
router.post('/login',async(req,res,next)=>{
    const { body } = req;
    try{
        const user= await login(body);
        res.json(user);
    }catch(err){
        next(err);
    } 
});

router.patch('/:id', async(req,res,next)=>{
    const { params: {id},body }=req;
    try{
        const users = await editOne(id,body);
        res.json(users);
    }catch(err){
        next(err);
    }
});




module.exports = router;
