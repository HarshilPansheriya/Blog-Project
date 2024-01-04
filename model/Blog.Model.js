const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = '/uploads/Blog';

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().toISOString().slice(0, 10),
    },
    username: {
        type: String,
        required: true,
    },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

BlogSchema.statics.uploadedAvatar = multer({ storage: storage }).single('image');
BlogSchema.statics.avatarPath = AVATAR_PATH;

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;