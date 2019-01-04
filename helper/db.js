const mongoose=require("mongoose");

module.exports=()=>{
    mongoose.connect('mongodb://MovieUser:112233a@ds149344.mlab.com:49344/movie-api',{ useNewUrlParser: true })
    mongoose.connection.on('open',()=>{
        console.log("mongodb:connected");
        
    })
    mongoose.connection.on('error',()=>{
        console.log("mongodb: not connected");
        
    })
    mongoose.Promise=global.Promise;
}