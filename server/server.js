const express = require('express');
const morgan = require('morgan');
const {join} = require('path');
const api = require('../routes/api');
const projects = require('../routes/projects');
require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(join(__dirname, '../client/build')));

app.use('/app', projects);
app.use('/api', api);

app.listen(port, () => {
    console.log('Listening on port', port);
})

