const mongoose=require("mongoose");

module.exports=()=>{
    mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true,  useCreateIndex: true })
    mongoose.connection.on('open',()=>{
        console.log("mongodb:connected");
        
    })
    mongoose.connection.on('error',()=>{
        console.log("mongodb: not connected");
        
    })
    mongoose.set('useFindAndModify', false);
    mongoose.Promise=global.Promise;
}