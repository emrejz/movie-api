const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DirectorSchema=new Schema({
    name:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        maxlength:[30, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[2, '`{PATH}` alanı min 2 karakter olabilir'],
        trim: true
    },
    surname:{
        type:String,
        required:[true, '`{PATH}` alanı boş olamaz'],
        maxlength:[30, '`{PATH}` alanı max 30 karakter olabilir'],
        minlength:[2, '`{PATH}` alanı min 2 karakter olabilir'],
        trim: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})



module.exports=mongoose.model('director',DirectorSchema);