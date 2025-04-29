const express = require('express');
const app = express();
require('dotenv').config();

// database connection
const dbConnection = require('./db');
dbConnection();
// routes
const adminRoute = require('../routes/admin/admin_route');
const categoryRoute = require('../routes/category/category_route');
const subcategoryRoute = require('../routes/subcategory/subcategory_route');
const brandRoute = require('../routes/brand/brand_route');
const variantRoute = require('../routes/variant/variant_routes');
const couponRoute = require('../routes/coupon/coupon_route');

// middlewares
app.use(express.json())
app.use('/api/admin',adminRoute)
app.use('/api/category',categoryRoute)
app.use('/api/subcategory',subcategoryRoute)
app.use('/api/brand',brandRoute)
app.use('/api/variant',variantRoute)
app.use('/api/coupon',couponRoute)

app.get('/',(req,res)=>{
    res.send("db connectd")
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`http://localhost/${port}`);
})