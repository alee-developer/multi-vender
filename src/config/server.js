const express = require('express');
const app = express();
require('dotenv').config();

// database connection
const dbConnection = require('./db');
dbConnection();

app.get('/',(req,res)=>{
    res.send("db connectd")
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`http//:localhost/${port}`);
})