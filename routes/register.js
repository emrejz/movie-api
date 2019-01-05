const express=require('express');
const router=express();

const Register=require('../Models/Register');



router.post("/",(req,res)=>{
    const {username,password}=req.body;
    const promise=new Register({
        username,
        password
    }).save();
    console.log(username,password);
    
    promise.then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json(err)
    })
})

module.exports=router;