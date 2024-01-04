const Comment = require('../../model/Comment.Model');


module.exports.insertComment = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = Comment.avatarPath + '/' + req.file.filename;
    }
    req.body.image = imgPath;
    let data = await Comment.create(req.body);
    if (data) {
        return res.redirect('back');
    } else {
        console.log("comment not Inserted");
        return res.redirect('back');
    }
}