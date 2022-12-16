const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register',(req,res)=>{
    const { username,email,password } = req.body;
    const newUser = User({
        username:username,
        email:email,
        password: password,
        isAdmin: false
    });
    newUser.save()
    .then((result)=>{
        res.send('Registered successfully');
    })
    .catch((error)=>{
        return res.status(404).json({message:error});
    })
});

router.post('/login',async(req,res)=>{
    const{email,password}= req.body;
    User.find({email,password})
    .then((result)=>{
        const user={
            username:result[0].username,
            email:result[0].email,
            isAdmin:result[0].isAdmin,
            _id:result[0]._id,
        };
        res.send(user);
    })
    .catch((error)=>{
        console.log(error);
        return res.status(404).json({message:error});
    })
});

router.get('/alluser',(req,res)=>{
    User.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(404).json({message:'Error'});
    })
});

router.post('/delete',(req,res)=>{
    const {_id} = req.body;
    User.findByIdAndDelete(_id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(404).json({message:'Error'});
    })
})

module.exports = router;