const express = require('express');
const {join} = require('path');
const router = express.Router();

router.use('/', express.static(join(__dirname, '../client/build')));
router.use((req, res) => {
    res.redirect('../');
})

module.exports = router;