const express=require('express');
const router=express.Router();
const Director=require('../Models/Director');


router.get("/",(req,res,next)=>{
    const promise= Director.aggregate([
       { $lookup:{
            from:'movies',
            localField:'_id',
            foreignField:'director_id',
            as:'movies'
        }},
       { $unwind:{
            path:"$movies",
            preserveNullAndEmptyArrays: true
        }},{
        $group:{
            _id:{
                _id:'$_id',
                name:'$name',
                surname:'$surname'
            },
            movies:{
                $push:'$movies'
            }}
           
            },
             {
            $project:{
                    _id:'$_id._id',
                    name:'$_id.name',
                    surname:'$_id.surname',
                    movies:'$movies'
                }
        }

    ]);
    promise.then(data=>{
      
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

