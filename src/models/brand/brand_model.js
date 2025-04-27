const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type:String,
        default:""
    },
    logo:{
        type:String,
        default:"",
    },
    isPupolar:{
        type:Boolean,
        default:false
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

BrandSchema.set('toJSON',{
    transform: (duc,data)=>{
        data.id = data._id;
        delete data._id;
        delete data.__v;
    }
})

module.exports = mongoose.model('Brand',BrandSchema);