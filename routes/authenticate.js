const express = require('express');
const router = express.Router();
const Register=require('../Models/Register');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

router.post('/authenticate', (req, res, next)=> {
  const {username,password}=req.body;
  Register.findOne({
    username,
  },(err,user)=>{
    if(err)
    throw err;
    if(!user){
      res.json({
        status:false,
        message:`Authentication failed,user not found!`
      });}
      else{
        bcrypt.compare(password,user.password)
        .then(result=>{
          if(!result)
          res.json({
            status:false,
            message:"Authentication failed,wrong password"
          })
          else{
      
            
            const payLoad={
              username
            };
            const token=jwt.sign(payLoad,req.app.get('api_secret_key'),
            {
              expiresIn:720 //12 saat  
            });
            res.json({
              status:true,
              token
            })
  
            
          }
        
        }).catch(err=>{
         res.send(err)
        })
      }
    }
  )

});

module.exports = router;
