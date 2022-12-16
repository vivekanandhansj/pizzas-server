const express = require('express');
const router = express.Router();
const Pizza = require('../models/pizzaModels');

router.get('/pizzadata',async(req,res)=>{
    Pizza.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    })
});

router.post('/addnew',(req,res)=>{
    const{name,small,medium,large,description,imageurl,category} = req.body;
    const item = new Pizza({
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
        res.send('Added successfully');
    })
    .catch((err)=>{
        res.status(404).json({message:'Error'})
    })
})

router.post('/deletepizza',(req,res)=>{
    const {_id}= req.body;
    //console.log(_id);  -   forc checking
    Pizza.findByIdAndDelete(_id)
    .then((result)=>{
        res.send('Deleted successfully');
    })
    .catch((err)=>{
        res.status(404).json({message:'Error'})
    })
})

router.post('/single',(req,res)=>{
    const {pizzaid,type} = req.body;
    Pizza.findById(pizzaid)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(404).json({message:'error'});
    })
});

router.post('/singleedit',(req,res)=>{
    const{name,small,medium,large,description,imageurl,category,pizzaid} = req.body;
    const item = new Pizza({
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
    Pizza.findByIdAndUpdate(pizzaid,item)
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.status(404).json({message:'error'});
    })
})

module.exports = router;