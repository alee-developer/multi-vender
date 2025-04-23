const mongoose = require('mongoose');

// login model
adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    profileImage:{
        type:String,
    },
    role:{
        type:String,
        enum: ['super-admin', 'manager', 'staff'],
        default:'staff'
    },
    lastLogin:{
        type: Date
    },
    permissions:[{}],
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

adminSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('admin',adminSchema,"admins");