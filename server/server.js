const express = require('express');
const morgan = require('morgan');
const {join} = require('path');
const users = require('../routes/users');
const projects = require('../routes/projects');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();

app.use(morgan('dev'));
app.use(express.static(join(__dirname, '../client/build')));

app.use('/app', projects);
app.use('/users', users);

app.listen(port, () => {
    console.log('Listening on port', port);
})

