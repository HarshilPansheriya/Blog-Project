const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AVATAR_PATH = '/uploads/Comment';

const CommentSchema =mongoose.Schema ({
    name: { type: String, required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId,ref:'Blog', required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    comment: { type: String, required: true },
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

CommentSchema.statics.uploadedAvatar = multer({ storage: storage }).single('image');
CommentSchema.statics.avatarPath = AVATAR_PATH;

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;