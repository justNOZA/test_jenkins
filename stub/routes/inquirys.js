'use strict';
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var router = express.Router();

var bdn_200 = require('../json/inquirys/bdn_search_200.json');
var bdn_200_bunkernote = require('../json/inquirys/bdn_search_200_bunkernote.json');
var bdn_search_200_inquirys_test_A1_no2 = require('../json/inquirys/bdn_search_200_inquirys_test_A1_no2.json'); //ユーザ01 バージ船A2 補油実績一覧取得のテストデータNo2
var bdn_search_200_inquirys_test_A1_no4_1000data = require('../json/inquirys/bdn_search_200_inquirys_test_A1_no4_1000data.json'); //ユーザ01 バージ船A4 1000件テスト 
var bdn_200_c020c0012101001 = require('../json/inquirys/bdn_search_200_c020c0012101001.json');//ユーザ01 バージ船A1 補油実績一覧取得のテストデータNo1
var bdn_200_inquirys_test = require('../json/inquirys/bdn_search_200_inquirys_test.json');
var bdn_search_200_senario01 = require('../json/inquirys/bdn_search_200_senario01.json');
var bdn_search_200_senario04_7 = require('../json/inquirys/bdn_search_200_senario04_7.json');
var bdn_200_inquirys_test_error = require('../json/inquirys/bdn_search_200_inquirys_test_error.json');
var bdn_search_200_japark = require('../json/inquirys/bdn_search_200_japark.json');
var bdn_search_200_japark_others = require('../json/inquirys/bdn_search_401_403_japark.json');
var bdn_500 = require('../json/inquirys/bdn_search_500.json'); //ユーザ01 バージ船A6 条件に一致するレコードなし
var bdn_404 = require('../json/inquirys/bdn_search_404.json'); //ユーザ01 バージ船A6 条件に一致するレコードなし
var bdn_400 = require('../json/inquirys/bdn_search_400.json');
var bdn_500_senario4 = require('../json/inquirys/bdn_search_500_senario4.json');
var bdn_404_senario4 = require('../json/inquirys/bdn_search_404_senario4.json');
var bdn_400_senario4 = require('../json/inquirys/bdn_search_400_senario4.json');

var error_401 = require('../json/common/401.json');
var error_403 = require('../json/common/403.json');

router.use(bodyParser.json());

/* GET users listing. */
router.post('/', function (req, res) {
    res.set('Cache-Control', 'no-store')

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    console.log("req_header:" + JSON.stringify(req.headers));
    console.log("req_body:" + JSON.stringify(req.body));

    let fromDate = req.body.deliveryDateFrom;
    let toDate = req.body.deliveryDateTo;
    let bargeId = req.body.bargeBoatId;

    // アクセストークンの実装ができたら、このコメントを外す
    let token = req.header('Authorization');
    if (token == undefined) {
        res.status(403);
        res.end();
    }

    if (token == "Bearer senario01") { //自由に触ってよいユーザ
        res.status(500);
        res.send(bdn_500_senario4);
        res.end();
    }

    // 補油日作成
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var thisDate = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);
    // 昨日を文字列化
    date.setDate(date.getDate() - 1);
    month = date.getMonth() + 1
    day = date.getDate()
    var yesterDay = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);
    if (fromDate == '' && toDate == '') {
        res.status(400);
        res.send(bdn_400);
    } else if (/* senario01 */ token == "Bearer senario01") {
        var jsonStr = JSON.stringify(bdn_search_200_senario01);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    } else if (token == "Bearer bunkernote") {
        res.status(200);
        res.send(bdn_200_bunkernote);
    }
    else if (new Date(fromDate) > new Date(toDate)) {
        res.status(400);
        res.send(bdn_400);
    }
    else if (bargeId == 'c020c0012101001') { //バージ船A01
        res.status(200);
        res.send(bdn_200_c020c0012101001);
    }
    else if (bargeId == 'c02020010202002') { //バージ船A02
        res.status(200);
        res.send(bdn_search_200_inquirys_test_A1_no2);
    }
    else if (bargeId == 'BS0000000000003') { //バージ船3
        res.status(404);
        res.send(bdn_404_senario4);
    }
    else if (bargeId == 'BS0000000000004') { //バージ船4
        res.status(400);
        res.send(bdn_400_senario4);
    }
    else if (bargeId == 'BS0000000000005') { //バージ船5
        res.status(401);
        res.send(bdn_400);
    }
    else if (bargeId == 'BS0000000000006') { //バージ船6
        res.status(403);
        res.send(bdn_400);
    }
    else if (bargeId == 'BS0000000000007') { //バージ船7
        res.status(200);
        res.send(bdn_search_200_senario04_7);
    }
    else if (bargeId == 'BS0000000000008') { //バージ船8
        res.status(500);
        res.send(bdn_500_senario4);
    }
    else if (bargeId == 'c02020010202004') { //バージ船A04
        res.status(200);
        res.send(bdn_search_200_inquirys_test_A1_no4_1000data);
    }
    else if (bargeId == 'c02020020202005') { //test02 バージ船A05
        res.status(404);
        res.send(bdn_404);
    }
    else if (bargeId == 'c02020030202006') { //test02 バージ船A06
        res.status(500);
        res.send(bdn_500);
    }
    else if (bargeId == 'c02020010202007') { //バージ船A07
        res.status(200);
        res.send(bdn_200_inquirys_test);
    } else if (bargeId == 'c02020010202005') { //バージ船A05 エラーケースの検証
        res.status(200);
        res.send(bdn_200_inquirys_test_error);
    } else if (bargeId == "japark1") {
        var jsonStr = JSON.stringify(bdn_search_200_japark);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    } else if (bargeId == "japark4") {
        res.status(401);
        res.send(error_401);
    } else if (bargeId == "japark5") {
        res.status(401);
        res.send(error_403);
    } else if (bargeId.includes("japark")){
        res.status(200);
        var jsonStr = JSON.stringify(bdn_search_200_japark_others);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    }
    else {
        res.status(200);
        res.send(bdn_200);
    }
});

module.exports = router;