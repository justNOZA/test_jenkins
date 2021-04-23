'use strict';
var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

var draft_200 = require('../json/login/login_200.json');
var draft_400 = require('../json/login/login_400.json');
var draft_401 = require('../json/login/login_401.json');
var draft_404 = require('../json/login/login_404.json');
var draft_500 = require('../json/login/login_500.json');
var error_401 = require('../json/common/401.json');
var error_403 = require('../json/login/login_403.json');

//const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const head = 'Bearer eyJhbGciOiJIUzUxMiJ9';
const signature = 'F9wKNVi6XfTmtL4iTotaE6TB8HaVf3C0pRrXVoyMrx3wgNumVooUZY-baDwv7vsTT37d0yAxbFxeqmcN3LGsQQ';

router.use(bodyParser.json());

/* POST Login listing. */
router.post('/', function (req, res) {
    console.log("req_header:" + JSON.stringify(req.headers));
    console.log("req_body:" + JSON.stringify(req.body));

    let id = req.body.loginId;
    let pass = req.body.password;

    if (id === undefined || pass === undefined) {
        res.status(401);
        res.end();
    }
    else if (id == '' || pass == '') {
        res.status(400);
        res.send(draft_400);
    }
    else if (id == 'vessel01' && pass != '') {
        // 権限無しは 403
        res.status(403);
        res.end();
    }
    else if (id == 'test01' && pass != '') {

        var date = new Date();
        var txtPayload = '{"sub":"c02020012002010001@c0202001","roles":["ROLE_BARGE_BIZ_USER_FREE_TEST01"],"exp":2099-12-31 00:00}';
        var base64Payload = Buffer.from(txtPayload).toString('base64');
        var token = head + '.' + base64Payload + '.' + signature;

        res.setHeader('Authorization', token);
        res.status(200);
        // boby 無しで返却に変更
        // res.send(draft_200);
        res.end();
    }
    else if (id == 'test02' && pass != '') {

        var date = new Date();
        var txtPayload = '{"sub":"c02020012002010001@c0202001","roles":["ROLE_BARGE_BIZ_USER_FREE_TEST02"],"exp":2099-12-31 00:00}';
        var base64Payload = Buffer.from(txtPayload).toString('base64');
        var token = head + '.' + base64Payload + '.' + signature;

        res.setHeader('Authorization', token);
        res.status(200);
        // boby 無しで返却に変更
        // res.send(draft_200);
        res.end();
    }
    else if (id == 'test03' && pass != '') {

        var date = new Date();
        var txtPayload = '{"sub":"c02020012002010001@c0202001","roles":["ROLE_BARGE_BIZ_USER_FREE_TEST03"],"exp":2099-12-31 00:00}';
        var base64Payload = Buffer.from(txtPayload).toString('base64');
        var token = head + '.' + base64Payload + '.' + signature;
        console.log(token);

        res.setHeader('Authorization', token);
        res.status(200);
        // boby 無しで返却に変更
        // res.send(draft_200);
        res.end();
    } else if ((id == 'test04' || id == 'barge404') && pass != '') {
        var date = new Date();
        var txtPayload = '{"sub":"c02020012002010001@c0202001","roles":["ROLE_BARGE_BIZ_USER_FREE_TEST04"],"exp":2099-12-31 00:00}';
        var base64Payload = Buffer.from(txtPayload).toString('base64');
        var token = head + '.' + base64Payload + '.' + signature;
        console.log(token);
        res.setHeader('Authorization', token);
        res.status(200);
        res.end();
    } else if (id == 'freedomuser' && pass != '') {
        res.setHeader('Authorization', "freedomuser");
        res.status(200);
        res.end();
    } else if (id == 'draftlist400' && pass != '') {
        res.setHeader('Authorization', "draftlist400");
        res.status(200);
        res.end();
    } else if (id == 'draftlist404' && pass != '') {
        res.setHeader('Authorization', "draftlist404");
        res.status(200);
        res.end();
    } else if (id == 'bunkernote' && pass != '') {
        res.setHeader('Authorization', "bunkernote");
        res.status(200);
        res.end();
    } else if (id == 'issue400' && pass != '') {
        res.setHeader('Authorization', "issue400");
        res.status(200);
        res.end();
    } else if (id == 'issue500' && pass != '') {
        res.setHeader('Authorization', "issue500");
        res.status(200);
        res.end();
    } else if (id == 'login403' && pass != '') {
        res.status(403);
        res.send(error_403);
    } else if (id == 'test05' && pass != '') { //細かいテストを行うためのユーザ
        res.setHeader('Authorization', "test05");
        res.status(200);
        res.end();
    } else if (id == 'login400' && pass != '') { //ログインで400エラーをテストするためのユーザ
        res.status(400);
        res.send(draft_400);
    } else if (id == 'login404' && pass != '') { //ログインで404エラーをテストするためのユーザ
        res.status(404);
        res.send(draft_404);
    } else if (id == 'login500' && pass != '') { //ログインで500エラーをテストするためのユーザ
        res.status(500);
        res.send(draft_500);
    } else if (id == 'login401' && pass != '') { //ログインで401エラーをテストするためのユーザ
        res.status(401);
        res.send(error_401);
    } else if (id == 'barge401' && pass == 'password') { //ログインで401エラーをテストするためのユーザ
        var txtPayload = '{"sub":"c02020012002010001@c0202001","roles":["ROLE_BARGE_BIZ_USER_FREE_BARGE401"],"exp":2099-12-31 00:00}';
        var base64Payload = Buffer.from(txtPayload).toString('base64');
        var token = head + '.' + base64Payload + '.' + signature;
        console.log(token);

        res.setHeader('Authorization', token);
        res.status(200);
        // boby 無しで返却に変更
        // res.send(draft_200);
        res.end();
    } else if (id == 'barge403' && pass == 'password') { //ログインで401エラーをテストするためのユーザ
        var txtPayload = '{"sub":"c02020012002010001@c0202001","roles":["ROLE_BARGE_BIZ_USER_FREE_BARGE403"],"exp":2099-12-31 00:00}';
        var base64Payload = Buffer.from(txtPayload).toString('base64');
        var token = head + '.' + base64Payload + '.' + signature;
        console.log(token);

        res.setHeader('Authorization', token);
        res.status(200);
        // boby 無しで返却に変更
        // res.send(draft_200);
        res.end();
    } else if (id == 'senario01' && pass == 'password1') { // シナリオテストユーザー
        res.setHeader('Authorization', "senario01");
        res.status(200);
        res.end();
    } else if (id == 'bdnlistmente' && pass != '') {
        res.setHeader('Authorization', "bdnlistmente");
        res.status(200);
        res.end();
    } else if (id == 'bdnlist400' && pass != '') {
        res.setHeader('Authorization', "bdnlist400");
        res.status(200);
        res.end();
    } else if (id == 'bdnlist401' && pass != '') {
        res.setHeader('Authorization', "bdnlist401");
        res.status(200);
        res.end();
    } else if (id == 'bdnlist403' && pass != '') {
        res.setHeader('Authorization', "bdnlist403");
        res.status(200);
        res.end();
    } else if (id == 'bdnlist404' && pass != '') {
        res.setHeader('Authorization', "bdnlist404");
        res.status(200);
        res.end();
    } else if (id == 'bdnissue400' && pass != '') {
        res.setHeader('Authorization', "bdnissue400");
        res.status(200);
        res.end();
    } else if (id == 'bdnissue401' && pass != '') {
        res.setHeader('Authorization', "bdnissue401");
        res.status(200);
        res.end();
    } else if (id == 'bdnissue403' && pass != '') {
        res.setHeader('Authorization', "bdnissue403");
        res.status(200);
        res.end();
    } else if (id == 'bdnissue500' && pass != '') {
        res.setHeader('Authorization', "bdnissue500");
        res.status(200);
        res.end();
    } else if (id == 'senario02' && pass == 'password2') { // シナリオテストユーザー
        res.setHeader('Authorization', "senario02");
        res.status(200);
        res.end();
    } else if (id == 'senario03' && pass == 'password3') { // シナリオテストユーザー
        res.setHeader('Authorization', "senario03");
        res.status(200);
        res.end();
    } else if (id == 'japark' && pass == 'password'){
        res.setHeader('Authorization',"japark");
        res.status(200);
        res.end();
    } else if (id == 'draftDB' && pass != ''){
        res.setHeader('Authorization',"draftDB");
        res.status(200);
        res.end();
    } else if (id == 'bdntest01' && pass != ''){
        res.setHeader('Authorization',"bdntest01");
        res.status(200);
        res.end();
    }
    else {
        res.status(401);
        res.send(draft_401);
    }
});

module.exports = router;
