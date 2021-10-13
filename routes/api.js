const dataConnect = require('../database/db')
const express = require('express');
const router = express.Router();

router.get('/user/:id', async (req, res) => {
    result = await dataConnect(req.method, req.params.id);
    res.send(result)
})

router.post('/user/:id', (req, res) => {
    dataConnect(req.method, req.params.id, req.body);
    res.send("POST Hello from Express")
})

module.exports = router;