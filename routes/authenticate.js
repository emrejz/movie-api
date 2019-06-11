const express = require('express');
const router = express.Router();
const Register=require('../Models/Register');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/', (req, res, next)=> {
  const {username,password}=req.body;
  Register.findOne(
    {username}
  ,(err,user)=>{
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
           jwt.sign(payLoad,process.env.API_SECRET_KEY,
            {
              expiresIn:720 //12 saat  
            },(err,token)=>{
              if(err)
                next(err)
              else{
                res.cookie('x-access-token',token,{httpOnly:true,secure:false,maxAge: 43200000});
                res.json({
                  status:true,  
                  token
            })}
            });
          }
        }).catch(err=>{
          next(err)
        })
      }
    }
  )
});

module.exports = router;
