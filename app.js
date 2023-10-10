const mongoose = require('mongoose');
const express = require('express');
const app = express();
const API_PORT = 8080;

const routes = require('./src/routes/routes.js');

app.use(express.json());
app.use('/', routes);

app.listen(API_PORT, () => console.log('Listening on port ' + API_PORT + '...'));

mongoose
    .connect('mongodb://127.0.0.1:27017/insurancedb', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(error => console.error('Could not connect to MongoDB... ', error));
