const express = require('express');
const PORT = 8888;
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const passportLocal = require('./config/passport');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flashConnect = require('connect-flash');
const flash = require('./config/flashMsg');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cookieParser());
app.use(session({
    name: 'Login',
    secret: 'Keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 10 * 36000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)
app.use(flashConnect());
app.use(flash.setFlash);


app.use('/', require('./routes/AdminRoutes/AdminRoutes'));
app.use('/user', require('./routes/UserRoutes/UserRoutes'));


app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not connected");
        return false;
    }
    console.log("Server is connected on PORT:", PORT);
});