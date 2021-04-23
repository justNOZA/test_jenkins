'use strict';
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var router = express.Router();

var error_401 = require('../json/common/401.json');
var error_403 = require('../json/common/403.json');
var draft_200 = require('../json/draft/bdn_draft_200.json'); //BDNドラフト一覧単体テスト用
var draft_200_freedom = require('../json/draft/bdn_draft_200_freedom.json'); //自由に触るよう
var draft_200_a4_free = require('../json/draft/bdn_draft_200_a4_free_test.json'); //何用？
var draft_200_test05_a1 = require('../json/draft/bdn_draft_200_regist_test05_a1.json'); //バルク4件テスト用
var draft_200_regist_test = require('../json/draft/bdn_draft_200_regist_test.json'); //補油実績登録用
var draft_200_confirm_test = require('../json/draft/bdn_draft_200_confirm_test.json'); //補油実績登録用
var draft_200_confirm_bdnissue = require('../json/draft/bdn_draft_200_regist_bdnerror.json');
var draft_200_senario01 = require('../json/draft/bdn_draft_200_senario01.json');
var draft_200_japark = require('../json/draft/bdn_draft_200_japark.json');
var draft_200_japark_others = require('../json/draft/bdn_draft_200_japark_others.json');
var draft_200_bunkernote = require('../json/draft/bdn_draft_200_bunkernote.json');
var draft_400 = require('../json/draft/bdn_draft_400.json');
var draft_400_senario01 = require('../json/draft/bdn_draft_400_senario01.json');
var draft_404 = require('../json/draft/bdn_draft_404.json');
var draft_404_senario01 = require('../json/draft/bdn_draft_404_senario01.json');
var draft_200_draftDB = require("../json/draft/bdn_draft_200_draftDB.json");
var draft_200_bdnTest01 = require("../json/draft/bdn_draft_200_bdnTest01.json")
router.use(bodyParser.json());

/* POST BDN Draft listing. */
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

    let fromDate = req.body.deliveryDateFrom;
    let toDate = req.body.deliveryDateTo;
    let bargeId = req.body.bargeBoatId;

    if (bargeId == 'c02020020202006' || token == "Bearer bdnlist403") {
        res.status(403);
        res.send(error_403);
    }

    if (bargeId == undefined) {
        res.status(401);
        res.end();
    }
    else if (token == "Bearer draftlist400") {
        res.status(400);
        res.send(draft_400);
    }
    else if (token == "Bearer freedomuser") {
        res.status(200);
        res.send(draft_200_freedom);
    }
    else if (token == "Bearer draftlist404") {
        res.status(404);
        res.send(draft_400);
    }
    else if (token == /*issue400 issue404 issue500 */
        "Bearer issue400" || token == "Bearer issue404" || token == "Bearer issue500") {
        res.status(200);
        res.send(draft_200_confirm_bdnissue);
    }
    else if (token ==
        "Bearer bunkernote") {
        res.status(200);
        res.send(draft_200_bunkernote);
    }
    else if (token == /*bdnlistmente*/
        "Bearer bdnlistmente") {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.status(200);
        res.send("メンテナンス");
    }
    else if (token == /*bdnlist400*/
        "Bearer bdnlist400") {
        res.status(400);
        res.send(draft_400_senario01);
    }
    else if (token == /*bdnlist404*/
        "Bearer bdnlist404") {
        res.status(404);
        res.send(draft_404_senario01);
    }
    else if (bargeId == '' || token == "Bearer bdnlist401") {
        res.status(401);
        res.end();
    }
    else if (fromDate == '' && toDate == '') {
        res.status(400);
        res.send(draft_400);
    }
    else if (new Date(fromDate) > new Date(toDate)) {
        res.status(400);
        res.send(draft_400);
    }
    else if (fromDate == toDate) {
        res.status(404);
        res.send(draft_404);
    }
    else if (bargeId == 'c02020010202005') {
        res.status(404);
        res.send(draft_404);
    } else if (bargeId == 'c02020010202004') { //バージ4のリストは自由に触ってOK
        res.status(200);
        res.send(draft_200_a4_free);
    } else if (bargeId == 'test05a1') { //バージ5のバージa1 バルクが4件のテスト
        res.status(200);
        res.send(draft_200_test05_a1);
    } else if (bargeId == 'BS0000000000001' || bargeId == 'BS0000000000002') { //シナリオ01
        // 補油日作成
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        // 今日を文字列化
        var thisDate = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);
        // 明日を文字列化
        date.setDate(date.getDate() + 1);
        month = date.getMonth() + 1
        day = date.getDate()
        var nextDate = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);

        // 7日後を文字列化
        date.setDate(date.getDate() + 6);
        month = date.getMonth() + 1
        day = date.getDate()
        var nextWeek = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);

        var jsonStr = JSON.stringify(draft_200_senario01);
        // 今日を変換
        var responceStr = jsonStr.replace(/THIS_DATE/g, thisDate);
        // 明日を変換
        var responceStr = responceStr.replace(/NEXT_DATE/g, nextDate);
        // 明日を変換
        var responceStr = responceStr.replace(/NEXT_WEEK/g, nextWeek);

        res.status(200);
        res.send(JSON.parse(responceStr));
    } else if (bargeId == 'japark1') {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var today = year + "-" + ((month < 10) ? '0' + month : month) + "-" + ((day < 10) ? '0' + day : day);
        var dateInfo = JSON.stringify(draft_200_japark);
        dateInfo = dateInfo.replace(/TODAY/g, today);
        res.status(200);
        res.send(JSON.parse(dateInfo));
    } else if (bargeId == 'japark2') {
        res.status(401);
        res.send(error_401);
    } else if (bargeId == 'japark3') {
        res.status(403);
        res.send(error_403);
    } else if (bargeId.includes("japark")) {
        res.status(200);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var today = year + "-" + ((month < 10) ? '0' + month : month) + "-" + ((day < 10) ? '0' + day : day);
        var dateInfo = JSON.stringify(draft_200_japark_others);
        dateInfo = dateInfo.replace(/TODAY/g, today);
        res.send(JSON.parse(dateInfo));
    } else if (bargeId == "3001") {
        res.status(200);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var today = year + "-" + ((month < 10) ? '0' + month : month) + "-" + ((day < 10) ? '0' + day : day);
        var dateInfo = JSON.stringify(draft_200_draftDB);
        dateInfo = dateInfo.replace(/today/g, today);
        res.send(JSON.parse(dateInfo));
    }
    else {
        // 補油日作成
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        // 今日を文字列化
        var thisDate = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);
        // 明日を文字列化
        day = day + 1;
        var nextDate = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);

        // 7日後を文字列化
        date.setDate(date.getDate() + 7);
        month = date.getMonth() + 1
        day = date.getDate()
        var nextWeek = year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day);

        var jsonStr
        // JSON を一旦文字列の戻す
        if (bargeId == 'c02020010202008') {
            jsonStr = JSON.stringify(draft_200_regist_test);
        } else if (bargeId == 'c02020010202009') {
            if (token == /*bdntest01*/ "Bearer bdntest01") {
                jsonStr = JSON.stringify(draft_200_bdnTest01);
            } else {
                jsonStr = JSON.stringify(draft_200_confirm_test);
            }
        }
        else {
            jsonStr = JSON.stringify(draft_200);
        }
        // 今日を変換
        var responceStr = jsonStr.replace(/THIS_DATE/g, thisDate);
        // 明日を変換
        var responceStr = responceStr.replace(/NEXT_DATE/g, nextDate);
        // 明日を変換
        var responceStr = responceStr.replace(/NEXT_WEEK/g, nextWeek);

        res.status(200);
        res.send(JSON.parse(responceStr));
    }
});

module.exports = router;