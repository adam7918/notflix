var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.send('GET handler for /movies route.');
});

router.post('/', function(req, res) {
    res.send('POST handler for /movies route.');
});

module.exports = router;