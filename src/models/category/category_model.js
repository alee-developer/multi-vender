const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String,default:"" },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

CategorySchema.pre('save',function(next){
    if(!this.slug && this.name){
        this.slug = slugify(this.name,{lower:true,strict:true});
    }
    next();
})

CategorySchema.set('toJSON',{
    transform:(doc,ret)=>{
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})

module.exports = mongoose.model('Category', CategorySchema);