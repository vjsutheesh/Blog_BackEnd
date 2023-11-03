const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes/router')
const mongoose = require('mongoose')
const HttpError = require('./model/http-error')
require('dotenv').config();
const app = express()
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
    next();
})  
app.use(Routes)
app.use((error,req,res,next)=>{
    if(res.headerSent)
    {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message:error.message || "An unknown error occured !"})
})
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DATABASE CONNECTED")
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running `);
    });
}).catch(err=>{
     console.log(err)
     console.log("**********************************************************")
})