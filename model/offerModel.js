const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;