const dataConnect = require('../database/db')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    dataConnect(req.method);
    res.send("GET from Express")
})

router.post('/', (req, res) => {
    dataConnect(req.method);
    res.send("POST Hello from Express")
})

module.exports = router;