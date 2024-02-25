const mongoose = require('mongoose');

//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
});

db.on('error', (err)=>{
    console.log('MondoDB error :' , err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

module.exports = db;