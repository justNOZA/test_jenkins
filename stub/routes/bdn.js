'use strict';
var express = require('express');
var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var router = express.Router();

// 補油実績照会
var error_401 = require('../json/common/401.json');
var error_403 = require('../json/common/403.json');

var inquiry_bunkernote = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_bunkernote.json', 'utf-8');
var inquiry_B2021_00001 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2021-00001.json', 'utf-8');
var inquiry_B2021_00002 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2021-00002.json', 'utf-8');
var inquiry_B2021_00003 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2021-00003.json', 'utf-8');
var inquiry_B2021_00004 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2021-00004.json', 'utf-8');
var inquiry_10000000001 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_10000000001.json', 'utf-8');
var inquiry_10000000002 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_10000000002.json', 'utf-8');
var inquiry_10000000003 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_10000000003.json', 'utf-8');
var inquiry_B2011000001 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2011000001.json', 'utf-8');
var inquiry_B2011000002 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2011000002.json', 'utf-8');
var inquiry_B2011000003 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2011000003.json', 'utf-8');
var inquiry_B2011000004 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B2011000004.json', 'utf-8');
var inquiry_D0000000001 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_D0000000001.json', 'utf-8');
var inquiry_D0000000002 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_D0000000002.json', 'utf-8');
var inquiry_D0000000003 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_D0000000003.json', 'utf-8');
var inquiry_error_400 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_400.json', 'utf-8');
var inquiry_error_401 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_401.json', 'utf-8');
var inquiry_error_403 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_403.json', 'utf-8');
var inquiry_error_404 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_404.json', 'utf-8');
var inquiry_error_500 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_500.json', 'utf-8');
var inquiry_B211S_00018 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B211S_00018.json', 'utf-8');
var inquiry_B211S_00028 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B211S_00028.json', 'utf-8');
var inquiry_B211S_00038 = fs.readFileSync('/var/www/ttc_bdn_stub/json/inquiry/bdn_result_200_B211S_00038.json', 'utf-8');
var inquiry_bad_param = require('../json/inquiry/bdn_result_400.json');
var inquiry_not_found = require('../json/inquiry/bdn_result_404.json');
var inquiry_max_found = require('../json/inquiry/bdn_result_500.json');
var imgBinary = fs.readFileSync("/var/www/ttc_bdn_stub/img/sing.png", { encoding: "base64" })
var bunkernoteImg = fs.readFileSync("/var/www/ttc_bdn_stub/img/bunkernote.png", { encoding: "base64" })
var cameraBinary = fs.readFileSync("/var/www/ttc_bdn_stub/img/dog.jpeg", { encoding: "base64" })
var inquiry_P0000000011 = require('../json/inquiry/bdn_result_200_P0000000011.json');
var inquiry_P0000000012 = require('../json/inquiry/bdn_result_200_P0000000012.json');
inquiry_10000000001 = inquiry_10000000001.replace("binary_data", imgBinary)
inquiry_bunkernote = inquiry_bunkernote.replace("binary_data", bunkernoteImg)
inquiry_10000000002 = inquiry_10000000002.replace("attachment_data", cameraBinary)
inquiry_10000000003 = inquiry_10000000003.replace("binary_data", imgBinary)
inquiry_B211S_00018 = inquiry_B211S_00018.replace("binary_data", imgBinary)
inquiry_B211S_00028 = inquiry_B211S_00028.replace("binary_data", imgBinary)
inquiry_B211S_00038 = inquiry_B211S_00038.replace("binary_data", imgBinary)

// 補油実績登録
var bdn_200 = require('../json/bdn/tablet_bdn_200.json');
var bdn_400 = require('../json/bdn/tablet_bdn_400.json');
var bdn_400_senario01 = require('../json/bdn/tablet_bdn_400_senario01.json');
var bdn_404 = require('../json/bdn/tablet_bdn_404.json');
var bdn_500 = require('../json/bdn/tablet_bdn_500.json');
var bdn_500_senario01 = require('../json/bdn/tablet_bdn_500_senario01.json');
const { Console } = require('console');

/* GET bdn listing. */
router.get('/', function (req, res) {
    res.set('Cache-Control', 'no-store')
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    console.log("req_header:" + req.headers);
    console.log("req_body:" + req.body);

    let token = req.header('Authorization');
    if (token == undefined) {
        res.status(403);
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

    let numberOfBdn = req.query["bdnNo"];

    if (numberOfBdn === undefined) {
        res.status(400);
        res.send(inquiry_bad_param);
    } else if (token == "Bearer freedomuser") { //自由に触ってよいユーザ
        res.status(403);
        res.send(bdn_403);
    }
    else if (token == "Bearer bunkernote") {
        res.status(200);
        res.send(inquiry_bunkernote);
    }
    else if (numberOfBdn == '10000000001') {
        res.status(200);
        res.send(inquiry_10000000001);
    }
    else if (numberOfBdn == 'D0000000001') {
        var jsonStr = JSON.stringify(inquiry_D0000000001);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    }
    else if (numberOfBdn == 'D0000000002') {
        var jsonStr = JSON.stringify(inquiry_D0000000002);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    }
    else if (numberOfBdn == 'D0000000003') {
        var jsonStr = JSON.stringify(inquiry_D0000000003);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    }
    else if (numberOfBdn == 'B2021-00001') {
        res.status(200);
        res.send(inquiry_B2021_00001);
    }
    else if (numberOfBdn == 'B2021-00002') {
        res.status(200);
        res.send(inquiry_B2021_00002);
    }
    else if (numberOfBdn == 'B2021-00003') {
        res.status(200);
        res.send(inquiry_B2021_00003);
    }
    else if (numberOfBdn == 'B2021-00004') {
        res.status(200);
        res.send(inquiry_B2021_00004);
    }
    else if (numberOfBdn == '10000000002') {
        res.status(200);
        res.send(inquiry_10000000002);
    }
    else if (numberOfBdn == '10000000003') {
        res.status(200);
        res.send(inquiry_10000000003);
    }
    else if (numberOfBdn == 'B211S-00018') {
        res.status(200);
        res.send(inquiry_B211S_00018);
    }
    else if (numberOfBdn == 'B211S-00028') {
        res.status(200);
        res.send(inquiry_B211S_00028);
    }
    else if (numberOfBdn == 'B211S-00038') {
        res.status(200);
        res.send(inquiry_B211S_00038);
    }
    else if (numberOfBdn == 'B2011000002') {
        res.status(200);
        res.send(inquiry_B2011000002);
    }
    else if (numberOfBdn == 'B2011000001') {
        res.status(200);
        res.send(inquiry_B2011000001);
    }
    else if (numberOfBdn == 'B2011000003') {
        res.status(200);
        res.send(inquiry_B2011000003);
    } else if (numberOfBdn == 'B2011000004') {
        res.status(200);
        res.send(inquiry_B2011000004);
    } else if (numberOfBdn == 'B2011000011') {
        res.status(400);
        res.send(inquiry_error_400);
    } else if (numberOfBdn == 'B2011000012') {
        res.status(401);
        res.send(inquiry_error_401);
    } else if (numberOfBdn == 'B2011000013') {
        res.status(403);
        res.send(inquiry_error_403);
    } else if (numberOfBdn == 'B2011000014') {
        res.status(404);
        res.send(inquiry_error_404);
    } else if (numberOfBdn == 'B2011000015') {
        res.status(500);
        res.send(inquiry_error_500);
    } else if (numberOfBdn == 'E0000000400') {
        res.status(400);
        res.send(inquiry_error_400);
    } else if (numberOfBdn == 'E0000000401') {
        res.status(401);
        res.send(inquiry_error_401);
    } else if (numberOfBdn == 'E0000000403') {
        res.status(403);
        res.send(inquiry_error_403);
    } else if (numberOfBdn == 'E0000000404') {
        res.status(404);
        res.send(inquiry_error_404);
    } else if (numberOfBdn == 'E0000000500') {
        res.status(500);
        res.send(inquiry_error_500);
    }
    else if (numberOfBdn == '*') {
        res.status(500);
        res.send(inquiry_max_found);
    } else if (numberOfBdn == 'P0000000011') {
        var jsonStr = JSON.stringify(inquiry_P0000000011);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    } else if (numberOfBdn == 'P0000000012') {
        var jsonStr = JSON.stringify(inquiry_P0000000012);
        var responceStr = jsonStr.replace(/TODAY/g, thisDate);
        responceStr = responceStr.replace(/YESTERDAY/g, yesterDay);
        res.status(200);
        res.send(JSON.parse(responceStr));
    } else if (numberOfBdn == 'ERROR401') {
        res.status(401);
        res.send(error_401);
    } else if (numberOfBdn == 'ERROR403') {
        res.status(403);
        res.send(error_403);
    }
    else {
        res.status(404);
        res.send(inquiry_not_found);
    }
});

/* POST bdn listing. */
router.post('/', upload.fields([{ name: 'signFile' }, { name: 'attachmentFile' }]), function (req, res) {

    res.setHeader("Content-Type", "application/json; charset=utf-8");

    let numberOfBdn = req.body.bdnNo;

    let token = req.header('Authorization');
    if (token == undefined) {
        res.status(403);
        res.end();
    }
    console.log("req_header:" + JSON.stringify(req.headers));
    console.log("req_body:" + JSON.stringify(req.body));

    if (numberOfBdn === undefined) {
        res.status(500);
        res.send(bdn_500);
    } else if (token == "Bearer freedomuser") { //自由に触ってよいユーザ
        res.status(403);
        res.send(bdn_403);
    } else if (token == "Bearer issue400") {
        res.status(400);
        res.send(bdn_400);
    } else if (token == "Bearer issue404") {
        res.status(404);
        res.send(bdn_404);
    } else if (token == "Bearer issue500") {
        res.status(500);
        res.send(bdn_500);
    } else if (token == "Bearer bdnissue400") {
        res.status(400);
        res.send(bdn_400_senario01);
    } else if (token == "Bearer bdnissue401") {
        res.status(401);
        res.send(bdn_500);
    } else if (token == "Bearer bdnissue403") {
        res.status(403);
        res.send(bdn_500);
    } else if (token == "Bearer bdnissue500") {
        res.status(500);
        res.send(bdn_500_senario01);
    }
    else if (numberOfBdn == '20000000001' || numberOfBdn == '10000000001' || numberOfBdn == '10000000002' || numberOfBdn == '10000000003' || numberOfBdn == 'D0000000001' || numberOfBdn == 'D0000000002' || numberOfBdn == 'D0000000003' || numberOfBdn == 'D0000000004') {
        res.status(200);
        res.send(bdn_200);
    }
    else if (token == 'Bearer japark') {
        res.status(200);
        res.send(bdn_200)
    }
    else if (numberOfBdn == '10000000400') {
        res.status(400);
        res.send(bdn_400_senario01);
    }
    else if (numberOfBdn == '10000000500') {
        res.status(500);
        res.send(bdn_500_senario01);
    }
    else if (numberOfBdn == '*') {
        res.status(500);
        res.send(bdn_500);
    }
    else if (numberOfBdn != '') {
        res.status(404);
        res.send(bdn_404);
    }
    else {
        res.status(400);
        res.send(bdn_400);
    }
});

module.exports = router;