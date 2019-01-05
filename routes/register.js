const express=require('express');
const router=express();

const Register=require('../Models/Register');
const bcrypt = require('bcrypt');




router.post("/",(req,res)=>{
    const {username,password}=req.body;
    bcrypt.hash(password, 10).then(function(hash) {
        const promise=new Register({
            username,
            password:hash
            
        }).save();
        console.log(hash)
        promise.then(data=>{
            res.json(data);
        })
        .catch(err=>{
            res.json(err)
        })
    });
    
})

module.exports=router;