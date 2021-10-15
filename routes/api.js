const dataConnect = require('../database/db')
const express = require('express');
const router = express.Router();

router.get('/user/:id', async (req, res) => {
    result = await dataConnect(req.method, req.params.id);
    res.send(result)
})

router.post('/user/:id', (req, res) => {
    dataConnect(req.method, req.params.id, req.body);
})

router.put('/user/:id', (req, res) => {
    dataConnect(req.method, req.params.id, req.body)
})

module.exports = router;