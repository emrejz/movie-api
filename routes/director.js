const express=require('express');
const mongoose=require('mongoose');

const router=express.Router();
const Director=require('../Models/Director');

router.post("/",(req,res,next)=>{
    const promise=new Director(req.body).save();
    promise.then(data=>{
        // if(!data)
        // next({message:"director parameters are not incorrect!",code:2})   
        res.json(data)
    })
    .catch(err=>{
        next(err)
    })

})

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
        next(err)
    })
});

router.get("/:directorId",(req,res,next)=>{
    const promise= Director.aggregate([
        
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.directorId)
        }},
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }},{
            $unwind:{
                path:'$movies',
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
                }
            }},{
                $project:{
                    _id:'$_id._id',
                    name:'$_id.name',
                    surname:'$_id.surname',
                    movies:'$movies'
                }
            }
        
    ])
 
    promise.then(data=>{
        res.json(data)
    })
    .catch(err=>{
        next(err)
    })
})

router.put("/:directorId",(req,res,next)=>{
const promise=Director.findByIdAndUpdate(
    req.params.directorId,
    req.body,
    {
        new: true
    }
    )
    promise.then(data=>{
        if(!data)
        next({message:"The director was not found!",code:2})
        res.json(data)
        
    }).catch(err=>{
        next(err)
    })
})

router.delete('/:directorId',(req,res,next)=>{
    const promise=Director.findByIdAndRemove(
        req.params.directorId
    )
    promise.then(data=>{
        if(!data)
        next({message:"Incorrect director parameter", code:3})
        res.json({status:1})
    }).catch(err=>{
        next(err)
    })
})

module.exports=router;

