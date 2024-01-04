const route = require('express').Router();
const Blog = require('../../model/Blog.Model');
const blogCtrl = require('../../controllers/Admin Controller/BlogController');


route.get('/', blogCtrl.addBlog);

route.post('/insertBlog', Blog.uploadedAvatar, blogCtrl.insertBlog);

module.exports = route;