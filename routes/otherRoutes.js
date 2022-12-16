const express = require('express');
const router = express.Router();
const OtherStuff = require('../models/otherStuffsModels');

router.get('/otherStuff',async(req,res)=>{
    OtherStuff.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.post('/addnew',(req,res)=>{
    const{name,small,medium,large,description,imageurl,category} = req.body;
    const item = new OtherStuff({
        name: name,
        varients:['small','medium','large'],
        prices:{
            small:small,
            medium: medium,
            large: large
        },
        category: category,
        image:imageurl,
        description: description
    });
    item.save()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(404).json({message:'error'});
    })
})

router.post('/delete',(req,res)=>{
    const {_id} = req.body;
    //console.log(_id);
    OtherStuff.findByIdAndDelete(_id)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(400).json({message:'error'});
    })
})

module.exports = router;