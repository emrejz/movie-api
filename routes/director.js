const express=require('express');
const router=express.Router();
const Director=require('../Models/Director');


router.get("/",(req,res,next)=>{
    const promise= Director.find({});
    promise.then(data=>{
        if(!data)
        next({message:"Director was not found!",code:1})
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })
});

router.post("/",(req,res,next)=>{
    const promise=new Director(req.body).save();
    promise.then(data=>{
        // if(!data)
        // next({message:"director parameters are not incorrect!",code:2})   
        res.json(data)
    })
    .catch(err=>{
        res.json(err)
    })

})




module.exports=router;

