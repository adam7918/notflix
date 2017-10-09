var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /ratings route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /ratings route.');
});

module.exports = router;