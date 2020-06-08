var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var bodyParser = require('body-parser');

// 用于解密jwt token
const expressJWT = require('express-jwt');
var { PRIVITE_KEY } = require("./util/jwtToken_config");

var app = express();

// 改写入口文件
var http = require('http');

var server = http.createServer(app);
跨域
var cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// req.body中间件
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(expressJWT({
    　　secret: PRIVITE_KEY
    }).unless({
    　　path: [
        '/api/regist',
        '/api/RecoverPwd',
        '/api/login',
    ] //⽩白名单,除了了这⾥里里写的地址，其他的URL都需要验证
}));


// 用于jwt验证失败的返回值
app.use(function (err, req, res, next) {
  
    if (err.name === 'UnauthorizedError') {   
        //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        // req.headers.authorization
        res.status(401).send({code:-1,msg:'token验证失败'});
    }
});




// 主路由
app.use('/api', indexRouter);






module.exports = app;

server.listen('3000')
