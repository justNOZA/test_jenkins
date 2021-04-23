'use strict';
var express = require('express');
var router = express.Router();

var error_401 = require('../json/common/401.json');
var error_403 = require('../json/common/403.json');

/* GET users listing. */
router.get('/', function (req, res) {
    console.log("req_header:" + JSON.stringify(req.headers));
    console.log("req_body:" + JSON.stringify(req.body));

    res.send('respond with a resource');
});

module.exports = router;
