const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, default:"" },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    isActive:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

SubcategorySchema.set('toJSON',{
    transform: (doc, data)=>{
        data.id = data._id;
        delete data._id;
        delete data.__v
    }
})
module.exports = mongoose.model('Subcategory', SubcategorySchema);
