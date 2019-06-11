const express = require('express');
const router = express.Router();

//models
const Movie=require('../Models/Movie');

router.get('/',(req,res,next)=>{
  const promise=Movie.aggregate([
    {$lookup:{
      from:"directors",
      localField:"director_id",
      foreignField:"_id",
      as:'director'
    } },
    { $unwind:"$director"
 
    }
  ]);
  promise.then(data=>{
    res.json(data)
  })
  .catch(err=>{
    next(err)
  })
})
router.get('/between/:start_year/:end_year',(req,res,next)=>{
  const {start_year,end_year}=req.params;
  const promise=Movie.find(
    {
      year:{"$gte":parseInt(start_year),"$lte":parseInt(end_year)}}
    );
  promise.then(data=>{
    res.json(data)
  })
  .catch(err=>{
    next(err)
  })
})
router.get('/top10',(req,res,next)=>{
  const promise=Movie.find({}).sort({imdb_score:-1}).limit(10);
  promise.then(data=>{
    if(!data)
    next({message:"Top list was not found "})
    res.json(data)
  })
    .catch(err=>{
      next(err)
    })
})

router.get('/:movie_id',(req,res,next)=>{
   
  const promise=Movie.findById(req.params.movie_id);
  promise.then((data)=>{
    if(!data)
    next({message:'The movie was not found!',code:1});
    res.json(data)
  })
  .catch(err=>{
    next(err)
  })
})
router.put('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndUpdate(
    req.params.movie_id ,
    req.body,
    {
      new:true //güncel datayı döndürür 
    });
  promise.then(data=>{
    if(!data)
    next({message:"The movie was not found!",code:1});
    res.json(data);
  })
  .catch(err=>{
    next(err)
  })
})

router.delete('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndRemove(req.params.movie_id);
  promise.then(data=>{
    if(!data)
    next({message:"The movie was not found!"})
    res.json({status:1});
  })
  .catch(err=>{
    next(err)
  })
})



router.post('/', (req, res, next)=> {
  const {title,imdb_score,category,country,year,director_id}=req.body;
// const movie=new Movie(req.body);
  const movie=new Movie({
    director_id:director_id,
    title:title,
    imdb_score:imdb_score,
    category:category,
    country:country,
    year:year,
  });
  const promise=movie.save();
   promise.then((data)=>{
     res.json(data)
   })
   .catch((err)=>{
     next(err)
   })
   

});

module.exports = router;
