'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var draft = require('./routes/draft');
var inquirys = require('./routes/inquirys');
var login = require('./routes/login');
var barge = require('./routes/barge');
var bdn = require('./routes/bdn');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// テスト画面
app.use('/', routes);
// BDN ドラフト一覧
app.use('/tablet/bdn_draft/search', draft);
// 補油実績照会一覧
app.use('/tablet/bdn/search', inquirys);
// GET 補油実績照会 / POST 補油実績登録
app.use('/tablet/bdn', bdn);
// ログイン
app.use('/tablet/user/login', login);
// バージ船マスタ
app.use('/tablet/barge_boat/search', barge);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-store')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
