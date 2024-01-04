const Slider = require('../../model/Slider.Model');
const Offer = require('../../model/offerModel');
const Blog = require('../../model/Blog.Model');
const Comment = require('../../model/Comment.Model');
const { findById } = require('../../model/Comment.Model');

module.exports.dashboard = async (req, res) => {
    let slider = await Slider.find();
    let offer = await Offer.find();
    let blog = await Blog.find();
    if (slider || offer) {
        return res.render('UserPanel/dashboard', {
            slider: slider,
            offer: offer,
            blog: blog,
        });
    }
    else {
        return res.redirect('/');
    }
}

module.exports.blogSingle = async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    let comments = await Comment.find({ blogId: req.params.id });
    let countComment = await Comment.find({ blogId: req.params.id }).countDocuments();
    let ltsBlog = await Blog.find().sort({ _id: -1 }).limit(3);
    let AllBlogs = await Blog.find({});

    let blogId = [];

    for (var i = 0; i < AllBlogs.length; i++) {
        blogId.push(AllBlogs[i].id);
    }

    var next;
    for (var i = 0; i < blogId.length; i++) {
        if (req.params.id == blogId[i]) {
            next = i;
        }
    }

    return res.render('UserPanel/blog_single', { blog: blog, countComment: countComment, comments: comments, ltsBlog: ltsBlog });
}

