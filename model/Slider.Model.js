const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads/Slider'
const multer = require('multer');
const path = require('path');

const SliderSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    slider_img: { type: String, required: true },
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

SliderSchema.statics.uploadedAvatar = multer({ storage: storage }).single('slider');
SliderSchema.statics.avatarPath = AVATAR_PATH;

const Slider = mongoose.model('Slider', SliderSchema);
module.exports = Slider;
