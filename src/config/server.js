const express = require('express');
const app = express();
require('dotenv').config();

// database connection
const dbConnection = require('./db');
dbConnection();
// routes
const adminRoute = require('../routes/admin/admin_route');

// middlewares
app.use(express.json())
app.use('/api/admin',adminRoute)

app.get('/',(req,res)=>{
    res.send("db connectd")
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`http//:localhost/${port}`);
})