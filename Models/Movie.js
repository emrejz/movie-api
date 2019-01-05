const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        unique:[true, '`{PATH}` alanı benzersiz olmalı'],
        maxlength:[30, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[1, '`{PATH}` alanı min 1 karakter olabilir'],
        trim: true
    },
    category:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        maxlength:[30, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[1, '`{PATH}` alanı min 1 karakter olabilir'],
        trim: true
    },
    country:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        maxlength:[30, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[1, '`{PATH}` alanı min 1 karakter olabilir'],
        trim: true
    },
    year:{
        type:Number,
        required:[true, '`{PATH}` alanı boş olamaz'],
        max:2020,
        min:1800,
        trim: true
    },
    imdb_score:{
        type:Number,  
        required:[true, '`{PATH}` alanı boş olamaz'],
        max:10,
        min:0,
        trim: true
        
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('movie',MovieSchema);