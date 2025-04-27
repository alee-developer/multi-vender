const mongoose = require('mongoose');

const VariantTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    inputType: {
        type: String,
        required: true,
        enum: ['text', 'dropdown', 'color-picker'],  // Optional: predefined types
        default: 'text'
    },
    options: {
        type: [String],   // Array of strings
        default: []
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Customize JSON output
VariantTypeSchema.set('toJSON', {
    transform: (doc, data) => {
        data.id = data._id;
        delete data._id;
        delete data.__v;
    }
});

module.exports = mongoose.model('VariantType', VariantTypeSchema);
