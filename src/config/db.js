const mongoose = require('mongoose');

connectDatabase = async()=>{
    try{
        mongoose.connect(process.env.DB_URL).then((_)=>{
            console.log("db connection", true)
        })
    }
    catch(error){
        console.log("db connect",false)
    }
}

module.exports = connectDatabase