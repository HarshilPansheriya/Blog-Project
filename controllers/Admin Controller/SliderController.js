const Slider = require('../../model/Slider.Model');

module.exports.addSlider = async (req, res) => {
    return res.render('AdminPanel/addSlider');
}

module.exports.insertSlider = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = Slider.avatarPath + '/' + req.file.filename;
    }
    req.body.slider_img = imgPath;
    let data = await Slider.create(req.body);
    if (data) {
        return res.redirect('/dashboard');
    }
    else {
        return res.redirect('back');
    }
}