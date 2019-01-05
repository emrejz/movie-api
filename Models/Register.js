const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const Register=new Schema({
     username:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        unique:[true, '`{PATH}` alanı benzersiz olmalı'],
        maxlength:[12, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[2, '`{PATH}` alanı min 1 karakter olabilir'],
        trim: true
    },
    password:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        maxlength:[12, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[5, '`{PATH}` alanı min 1 karakter olabilir'],
        trim: true
    }
})



module.exports=mongoose.model("register",Register)