var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var redisStore = require('connect-redis')(session);
var errorHandler = require("errorhandler");
var flash = require('connect-flash');
var multer = require('multer');
var log4js = require('./utils/logger').log4js;
var Logger = require('./utils/logger').Logger('access');
var routes = require('./routes');    // 创建路由控制
var _ = require('lodash');

/**
 * 设置express
 */
var app = express();                                // 创建项目实例
app.set('views', path.join(__dirname, 'views'));    // 定义模板目录
app.set('view engine', 'ejs');                      // 定义模板引擎
app.set('view cache', false);                       // 禁止模板缓存

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));      // 定义icon图标
app.use(bodyParser.json({limit: '1mb'}));                          // 定义数据解析器
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));    // 定义url编码方式，
app.use(cookieParser());                                           // 定义cookie解析器
app.use(express.static(path.join(__dirname, 'public')));           // 定义静态文件目录
var upload = multer({ dest: __dirname + '/public/tmp' });          // 设置上传目录
app.use(flash());

// 设置session
app.use(session({

    // 连接redis
    store: new redisStore({
        host: '127.0.0.1',
        port: 6379,
        db: 13,                        // 将db13设置为session的链接池
        ttl: 86000                     // session的过期时间为略少于24小时
    }),
    secret: 'personnel_management',    // redis密钥
    resave: false,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
    Logger.info('url:', req.path, '   method:', req.method, '  params:', JSON.stringify(req.params), '  body:', JSON.stringify(req.body), '   query:', JSON.stringify(req.query));
    if (_.includes(["/user/login"], req.path)) {
        next();
    }  else {
        if (!req.session.user) {
            res.redirect("/user/login");
        } else {
            next();
        }
    }
});

// 匹配路径和路由
app.use('/', routes);

/**
 * 拦截所有的结果，如果是错误写入日志
 */
app.use(function (err, req, res, next) {
    if (err) {
        var error = {method: req.method, url: req.originalUrl, message: err.message, stack: err.stack};
        log4js.getLogger('ERROR').error(JSON.stringify({error: error}));
    }

    // 开发者模式下调用error2Handler
    if ('development' === app.get('env')) {
        errorHandler()(err, req, res, next);
    } else {
        res.json({
            tag: 'error',
            error: err.status
        })
    }
});

// 404错误处理
app.use(function (req, res) {
    Logger.error(req.method, req.originalUrl, ' 404');
    var err = new Error('Not Found');
    err.status = 404;
    res.render('./error.ejs', {
        tag: 'error',
        error: err
    });
});

module.exports = app;