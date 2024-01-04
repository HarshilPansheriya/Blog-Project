const route = require('express').Router();
const adminCtrl = require('../../controllers/Admin Controller/AdminController');
const Admin = require('../../model/Admin.Model');
const passport = require('passport');
const auth = passport.authUser;
const active = passport.activeUser;

route.get('/', adminCtrl.login);
route.post('/checkLogin', passport.authenticate('Admin', { failureFlash: 'Invalid Email or Password!', failureRedirect: '/' }), adminCtrl.checkLogin);
route.get('/dashboard', auth, adminCtrl.dashboard);
route.get('/addAdmin', auth, adminCtrl.addAdmin);
route.get('/showAdmin', auth, adminCtrl.showAdmin);
route.get('/searchingAdmin', auth, adminCtrl.searchingAdmin);
route.get('/deActive/:id', auth, adminCtrl.deActive);
route.get('/active/:id', auth, adminCtrl.active);
route.get('/forgotPassword', adminCtrl.forgotPass)
route.get('/otp', adminCtrl.otp);
route.get('/resetPassword', adminCtrl.resetPassword);


route.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return res.redirect('back');
        }
        next();
    });
    return res.redirect('/');
})

route.post('/insertAdmin', Admin.uploadedAvatar, adminCtrl.insertAdmin);
route.post('/checkMail', adminCtrl.checkMail);
route.post('/checkOtp', adminCtrl.checkOtp);
route.post('/upassword', adminCtrl.upassword);

route.use('/addSlider', auth, require('./SliderRoute'));
route.use('/addOffer', auth, require('./OfferRoute'));
route.use('/addBlog', auth, require('./BlogRoutes'));

module.exports = route;