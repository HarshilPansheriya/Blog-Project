const Admin = require('../../model/Admin.Model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const md5 = require('md5');

module.exports.login = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    else {
        return res.render('AdminPAnel/Login_admin');
    }
}

module.exports.checkLogin = async (req, res) => {
    req.flash('success', "Login Successfully")
    return res.redirect('/dashboard');
}

module.exports.dashboard = async (req, res) => {
    return res.render('AdminPanel/dashboard');
}

module.exports.addAdmin = async (req, res) => {
    return res.render('AdminPanel/addAdmin');
}

module.exports.showAdmin = async (req, res) => {
    let search = '';
    if (req.query.search) {
        search = req.query.search;
    }


    let page = 1;
    if (req.query.page) {
        page = req.query.page;
    }
    const limit = 2;

    let data = await Admin.find({
        $or: [
            { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'email': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'hobby': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'gender': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'city': { $regex: '.*' + search + '.*', $options: 'i' } },
        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()

    let count = await Admin.find({
        $or: [
            { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'email': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'hobby': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'gender': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'city': { $regex: '.*' + search + '.*', $options: 'i' } },
        ]
    }).countDocuments();

    if (data) {
        return res.render('AdminPanel/showAdmin', {
            data: data,
            page: Math.ceil(count / limit),
            currentPage: page,
            search: search
        });
    }
    else {
        return res.redirect('back');
    }
}

module.exports.searchingAdmin = async (req, res) => {
    let search = '';
    if (req.query.search) {
        search = req.query.search;
    }


    let page = 1;
    if (req.query.page) {
        page = req.query.page;
    }
    const limit = 2;

    let data = await Admin.find({
        $or: [
            { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'email': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'hobby': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'gender': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'city': { $regex: '.*' + search + '.*', $options: 'i' } },
        ]
    })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()

    let count = await Admin.find({
        $or: [
            { 'name': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'email': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'hobby': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'gender': { $regex: '.*' + search + '.*', $options: 'i' } },
            { 'city': { $regex: '.*' + search + '.*', $options: 'i' } },
        ]
    }).countDocuments();

    if (data) {
        return res.render('AdminPanel/searching', {
            data: data,
            page: Math.ceil(count / limit),
            currentPage: page,
            search: search
        });
    }
    else {
        return res.redirect('back');
    }
}

module.exports.insertAdmin = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = Admin.avatarPath + '/' + req.file.filename;
    }
    req.body.avatar = imgPath;
    req.body.name = req.body.fname + ' ' + req.body.lname;
    let data = await Admin.create(req.body);
    if (data) {
        req.flash('success', "Admin Inserted");
        return res.redirect('back')
    }
    else {
        req.flash('error', "Something went wrong! Please try again!");
        return res.redirect('back')
    }
}

module.exports.deActive = async (req, res) => {
    let data = await Admin.findByIdAndUpdate(req.params.id, { isActive: false });
    if (data) {
        req.flash('success', "User Deactivated");
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}

module.exports.active = async (req, res) => {
    let data = await Admin.findByIdAndUpdate(req.params.id, { isActive: true });
    if (data) {
        req.flash('success', "User Activated");
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}

module.exports.forgotPass = async (req, res) => {
    return res.render('AdminPanel/forgotPass');
}

module.exports.checkMail = async (req, res) => {
    let mail = await Admin.findOne({ email: req.body.email });
    if (mail) {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "a9429466c21ff8",
                pass: "934913bc7168f2"
            }
        });
        var otp = Math.ceil(Math.random() * 10000);
        console.log(otp);

        let Otp = otp.toString();
        let hashOtp = await bcrypt.hash(Otp, 10)
        res.cookie('otp', hashOtp);
        res.cookie('mail', req.body.email);
        let info = await transport.sendMail({
            from: 'rnwharshilpansheriya@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Otp : ${otp}</b>`, // html body
        });
        return res.redirect('/otp');
    } else {
        req.flash('error', "Email not found!!")
        return res.redirect('back')
    }
}

module.exports.otp = async (req, res) => {
    return res.render('AdminPanel/otp');
}

module.exports.checkOtp = async (req, res) => {
    let checkOtp = await bcrypt.compare(req.body.otp, req.cookies.otp)
    if (checkOtp) {
        return res.redirect('/resetPassword');
    }
    else {
        req.flash('error', "Otp doesn't match")
        return res.redirect('back');
    }


    // if (req.body.otp === req.cookies.otp) {
    //     return res.redirect('/resetPassword');
    // } else {
    //     req.flash('error', "Otp doesn't match")
    //     return res.redirect('back');
    // }

}

module.exports.resetPassword = async (req, res) => {
    return res.render('AdminPanel/resetPassword');
}

module.exports.upassword = async (req, res) => {
    if (req.body.npass == req.body.cpass) {
        let email = await Admin.findOne({ email: req.cookies.mail });
        if (email) {
            let data = await Admin.findById(email.id);
            if (data) {
                let hashPassword = await bcrypt.hash(req.body.npass, 10);
                let cp = await Admin.findByIdAndUpdate(data.id, { password: hashPassword });
                if (cp) {
                    req.flash('success', "Password Changed Successfully");
                    res.clearCookie('otp');
                    res.clearCookie('mail');
                    return res.redirect('/');
                } else {
                    req.flash('error', "Password not changed");
                    return res.redirect('back');
                }
            } else {
                return res.redirect('back');
            }
        } else {
            req.flash('error', "Email not exists");
            return res.redirect('back');
        }
    } else {
        req.flash('error', "Passwords are not match");
        return res.redirect('back');
    }
}