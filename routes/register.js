const express=require('express');
const router=express();

const Register=require('../Models/Register');
const bcrypt = require('bcryptjs');




router.post("/",(req,res)=>{
    const {username,password}=req.body;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            const promise=new Register({
                username,
                password:hash
                
            }).save();
       
            promise.then(data=>{
                res.json(data);
            })
            .catch(err=>{
                res.json(err)
            })
        });
    });
  
   
    
})



module.exports=router;