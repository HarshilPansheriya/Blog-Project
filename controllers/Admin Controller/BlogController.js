const Blog = require('../../model/Blog.Model');

module.exports.addBlog = async (req, res) => {
    return res.render('AdminPanel/addBlog');
}

module.exports.insertBlog = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = Blog.avatarPath + '/' + req.file.filename;
    }
    req.body.image = imgPath;
    req.body.username = req.user.name;
    let data = await Blog.create(req.body);
    if (data) {
        return res.redirect('/');
    } else {
        return res.redirect('back');
    }

}

