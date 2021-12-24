const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const {join} = require('path');
const { MongoClient } = require('mongodb');
const api = require('./routes/api');
const projects = require('./routes/projects');
require('dotenv').config();

const port = process.env.PORT || 8000;

const app = express();

//app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(join(__dirname, '../client/public')));

app.use('/app', projects);
app.use('/api', api);

MongoClient.connect(process.env.MONGO_DB_URI, {promiseLibrary: Promise}, (err, client) => {
    if(err) {
        console.error(err)
    }
    app.locals.client = client;
    app.listen(port, () => {
        console.log('Listening on port', port);
    });
});


