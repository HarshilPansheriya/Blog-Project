const route = require('express').Router();
const userCtrl = require('../../controllers/User Controller/UserController');
const Comment = require('../../model/Comment.Model');
const cmntCtrl = require('../../controllers/Admin Controller/CommentController');

route.get('/', userCtrl.dashboard);
route.get('/blog_single/:id', userCtrl.blogSingle);
route.post('/insertComment', Comment.uploadedAvatar, cmntCtrl.insertComment);


module.exports = route;