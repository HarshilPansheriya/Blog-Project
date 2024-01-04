const passport = require('passport');
const Admin = require('../model/Admin.Model');
const passporLocal = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use('Admin', new passporLocal({
    usernameField: 'email',
}, async (email, password, done) => {
    let User = await Admin.findOne({ email: email });
    let hashPass = await bcrypt.compare(password, User.password)
    if (!User || !hashPass) {
        return done(null, false);
    }
    else if (User.isActive == false) {
        return done(null, false);
    }
    else {
        return done(null, User);
    }
}));

passport.authUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.redirect('/');
    }
}

passport.activeUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.isActive != true) {
            req.flash('error', "You have not permission")
            return res.redirect('back')
        }
        else {
            next();
        }
    }
}

passport.serializeUser((user, done) => {
    return done(null, user.id)
});



passport.deserializeUser(async (id, done) => {
    let User = await Admin.findById(id);
    if (User) {
        return done(null, User);
    }
    else {
        return done(null, false);
    }
})

passport.setUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
}


module.exports = passport;