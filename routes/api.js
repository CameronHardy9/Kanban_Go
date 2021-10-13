const dataConnect = require('../database/db')
const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
    dataConnect(req);
    res.send("GET from Express")
})

router.post('/user', (req, res) => {
    dataConnect(req);
    res.send("POST Hello from Express")
})

module.exports = router;