const express = require('express');
const morgan = require('morgan');
const {join} = require('path');

const port = 8080;

const app = express();

app.use(morgan('dev'));
app.use(express.static(join(__dirname, '../client/build')));

app.listen(port, () => {
    console.log('Listening on port', port);
})