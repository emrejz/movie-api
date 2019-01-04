const express = require('express');
const router = express.Router();

//models
const Movie=require('../Models/Movie');

router.get('/',(req,res,next)=>{
  const promise=Movie.find({});
  promise.then(data=>{
    res.json(data)
  })
  .catch(err=>{
    res.json(err)
  })
})




router.post('/', (req, res, next)=> {
  const {title,imdb_score,category,country,year}=req.body;
// const movie=new Movie(req.body);
  const movie=new Movie({
    title:title,
    imdb_score:imdb_score,
    category:category,
    country:country,
    year:year
  });
  const promise=movie.save();
   promise.then((data)=>{
     res.json(data)
   })
   .catch((err)=>{
     res.json(err)
   })
   

});

module.exports = router;
