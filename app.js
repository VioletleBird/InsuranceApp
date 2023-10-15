const API_PORT = 8080;
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const app = express();

const routes = require('./src/routes/routes.js');
const sessionKey = require('./src/config/config.js')

app.use(express.static(path.join(__dirname, 'src/public')));
app.use('/views', express.static(path.join(__dirname, './src/views')))
app.use(express.json());
app.use(expressSession({
    secret: `${sessionKey}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    }
}));
app.use('/', routes);

app.listen(API_PORT, () => console.log('Listening on port ' + API_PORT + '...'));

mongoose
    .connect('mongodb://127.0.0.1:27017/insurancedb', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('Could not connect to MongoDB... ', error));
