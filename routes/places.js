const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/places', function (req, res) {
    res.render('places');
})

module.exports = router;