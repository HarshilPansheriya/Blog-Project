const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1/BLOG";

mongoose.connect(URL);

mongoose.connection.on('connected', () => console.log('Db is connected'));
mongoose.connection.on('err', (err) => console.log("Error", err));
mongoose.connection.on('disconnected', () => console.log('Db is disconnected'));
