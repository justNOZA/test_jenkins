'use strict';
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

var error_401 = require('../json/common/401.json');
var error_403 = require('../json/common/403.json');
var barge_result_200 = require('../json/barge/barge_list_result_200.json');
var barge_result_200_test02 = require('../json/barge/barge_list_result_200_test02.json');
var barge_result_200_test05 = require('../json/barge/barge_list_result_200_test05.json');
var barge_result_200_bdnissue = require('../json/barge/barge_list_result_200_bdnerror.json');
var barge_result_200_senario01 = require('../json/barge/barge_list_result_200_senario01.json');
var barge_result_200_senario03 = require('../json/barge/barge_list_result_200_senario03.json');
var barge_result_200_bunkernote = require('../json/barge/barge_list_result_200_bunkernote.json');
var barge_result_200_japark = require('../json/barge/barge_list_result_200_japark.json');
var barge_result_400 = require('../json/barge/barge_list_result_400.json');
var barge_result_404 = require('../json/barge/barge_list_result_404.json');
var barge_result_200_draftDB = require('../json/barge/barge_list_result_200_draftDB.json');

/* GET users listing. */
router.post('/', function (req, res) {
        res.set('Cache-Control', 'no-store')
        res.setHeader("Content-Type", "application/json; charset=utf-8");

        console.log("req_header:" + JSON.stringify(req.headers));
        console.log("req_body:" + JSON.stringify(req.body));

        let token = req.header('Authorization');
        if (token == undefined) {
                res.status(403);
                res.end();
        }

        let auth = req.headers["authorization"];
        if (auth == /*test02*/ "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMDIwMjAwMTIwMDIwMTAwMDFAYzAyMDIwMDEiLCJyb2xlcyI6WyJST0xFX0JBUkdFX0JJWl9VU0VSX0ZSRUVfVEVTVDAyIl0sImV4cCI6MjA5OS0xMi0zMSAwMDowMH0=.F9wKNVi6XfTmtL4iTotaE6TB8HaVf3C0pRrXVoyMrx3wgNumVooUZY-baDwv7vsTT37d0yAxbFxeqmcN3LGsQQ") {
                res.status(200);
                res.send(barge_result_200_test02);
        } else if (auth == /*test03*/ "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMDIwMjAwMTIwMDIwMTAwMDFAYzAyMDIwMDEiLCJyb2xlcyI6WyJST0xFX0JBUkdFX0JJWl9VU0VSX0ZSRUVfVEVTVDAzIl0sImV4cCI6MjA5OS0xMi0zMSAwMDowMH0=.F9wKNVi6XfTmtL4iTotaE6TB8HaVf3C0pRrXVoyMrx3wgNumVooUZY-baDwv7vsTT37d0yAxbFxeqmcN3LGsQQ") {
                res.status(400);
                res.send(barge_result_400);
        } else if (auth == /*test04*/ "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMDIwMjAwMTIwMDIwMTAwMDFAYzAyMDIwMDEiLCJyb2xlcyI6WyJST0xFX0JBUkdFX0JJWl9VU0VSX0ZSRUVfVEVTVDA0Il0sImV4cCI6MjA5OS0xMi0zMSAwMDowMH0=.F9wKNVi6XfTmtL4iTotaE6TB8HaVf3C0pRrXVoyMrx3wgNumVooUZY-baDwv7vsTT37d0yAxbFxeqmcN3LGsQQ") {
                res.status(404);
                res.send(barge_result_404);
        } else if (auth == /*test05*/ "Bearer test05") {
                res.status(200);
                res.send(barge_result_200_test05);
        } else if (auth == /*draftlist400 draftlist404 issue400 issue404 issue500 */
                "Bearer draftlist400" || auth == "Bearer draftlist404" || auth == "Bearer issue400" || auth == "Bearer issue404" || auth == "Bearer issue500") {
                res.status(200);
                res.send(barge_result_200_bdnissue);
        } else if (auth == /*test05*/ "Bearer test05") {
                res.status(200);
                res.send(barge_result_200_test05);
        } else if (auth == /*test05*/ "Bearer test05") {
                res.status(200);
                res.send(barge_result_200_test05);
        } else if (auth == /*test05*/ "Bearer bunkernote") {
                res.status(200);
                res.send(barge_result_200_bunkernote);
        } else if (auth == /*senario01*/ "Bearer senario01") {
                res.status(200);
                res.send(barge_result_200_senario01);
        } else if (auth == /*senario01*/ "Bearer senario03") {
                res.status(200);
                res.send(barge_result_200_senario03);
        } else if (auth == /*barge401*/ "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMDIwMjAwMTIwMDIwMTAwMDFAYzAyMDIwMDEiLCJyb2xlcyI6WyJST0xFX0JBUkdFX0JJWl9VU0VSX0ZSRUVfQkFSR0U0MDEiXSwiZXhwIjoyMDk5LTEyLTMxIDAwOjAwfQ==.F9wKNVi6XfTmtL4iTotaE6TB8HaVf3C0pRrXVoyMrx3wgNumVooUZY-baDwv7vsTT37d0yAxbFxeqmcN3LGsQQ") {
                res.status(401);
                res.send(error_401);
        } else if (auth == /*barge403*/ "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjMDIwMjAwMTIwMDIwMTAwMDFAYzAyMDIwMDEiLCJyb2xlcyI6WyJST0xFX0JBUkdFX0JJWl9VU0VSX0ZSRUVfQkFSR0U0MDMiXSwiZXhwIjoyMDk5LTEyLTMxIDAwOjAwfQ==.F9wKNVi6XfTmtL4iTotaE6TB8HaVf3C0pRrXVoyMrx3wgNumVooUZY-baDwv7vsTT37d0yAxbFxeqmcN3LGsQQ") {
                res.status(403);
                res.send(error_403);
        } else if (auth == /*bdnlistmente*/
                "Bearer bdnlistmente" || auth == "Bearer bdnlist400" || auth == "Bearer bdnlist401" || auth == "Bearer bdnlist403" || auth == "Bearer bdnlist404" || auth == "Bearer bdnissue400" || auth == "Bearer bdnissue401" || auth == "Bearer bdnissue403" || auth == "Bearer bdnissue500") {
                res.status(200);
                res.send(barge_result_200_senario01);
        } else if (auth == /*japark*/ "Bearer japark") {
                res.status(200);
                res.send(barge_result_200_japark);
        } else if (auth == /*draftDB*/ "Bearer draftDB"){
                res.status(200);
                res.send(barge_result_200_draftDB);
        }else {
                res.status(200);
                res.send(barge_result_200);
        }
});

module.exports = router;