const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  linkTo: {
    type: mongoose.Schema.Types.Mixed, 
    required: true
  },
  position: {
    type: String,
    enum: ['Homepage', 'Sidebar'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });


bannerSchema.set('toJSON',{
    transform:(_,data)=>{
        data.id = data._id;
        delete data._id;
        delete data.__v
    }
})

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
