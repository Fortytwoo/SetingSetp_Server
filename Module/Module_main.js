var dbconfig = require('../util/dbconfig')
var settingSetp = require('./setSetpMain')


var {PRIVITE_KEY,EXPIRESD} = require('../util/jwtToken_config');
// jwt生成token
const jwt = require("jsonwebtoken");

getSetp = async (req,res) => {
    var username = req.user.username
    console.log(req.user.username);
    

    var sql = `SELECT cookie,userId,url,Sprot FROM user WHERE username="${username}"`
    var sqlArr
    var callBack = (err,data) => {
        if (err) {
            res.send({
                data: {},
                meta: {
                    code: 403,
                    msg: 'SQL_ERROR'
                }
            })
            return
        } else{
            data = JSON.parse(JSON.stringify(data))[0]
            console.log(data);
            
            res.send({
                data: {
                    cookie: data.cookie,
                    userId: data.userId,
                    url: data.url,
                    Sprot: data.Sprot
                },
                meta: {
                    code: 200,
                    meta: 'success!'
                }
            })
            return
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// cookie: string
// url:     string
// step: (Number)

// 设置步数
putSetp =async (req,res) => {
    updata = JSON.parse(JSON.stringify(req.body))
    // 检查 UserId 是否存在
    if (updata.userId) {
        var userId = updata.userId
    } else {
        res.send({
            data: {},
            meta: {
                code:403,
                msg: '请检查您的UserID'
            }
        })
        return
    }

    // 检查 Url 是否存在
    if (updata.url) {
        var url = updata.url
    } else {
        res.send({
            data: {},
            meta: {
                code:403,
                msg: '请检查您的Url'
            }
        })
        return
    }

    // 检查 Cookie 是否存在 
    if (updata.cookie) {
        var cookie = updata.cookie
    } else {
        res.send({
            data: {},
            meta: {
                code:403,
                msg: '请检查您的Cookie'
            }
        })
        return
    }

    // 检查 Setp 是否存在
    if (updata.Sprot) {
        var Sprot = updata.Sprot
        var step = Sprot
    } else {
        res.send({
            data: {},
            meta: {
                code:403,
                msg: '请检查您的Setp'
            }
        })
        return
    }
    var username = req.user.username
    console.log(username);
    var statusnum  = await settingSetp.main(cookie,url,userId,step)
    // 下面是校验过后，开始执行修改步数
    await function(){
        if (statusnum !== 200) {
            res.send({
                data:{},
                meta: {
                    code:500,
                    msg: '服务异常，请联系管理员处理！'
                }
            })
            return
        }
    }
    var sql = `UPDATE user SET cookie ="${cookie}",userId ="${userId}",url ="${url}",Sprot ="${Sprot}" WHERE username = "${username}"`
    var sqlArr = []
    var callBack = (err,data) => {
        
        if (err) {
            res.send({
                data: {},
                meta: {
                    code: 403,
                    msg: 'SQL_ERROR!'
                }
            })
            return
        } else {
            res.send({
                data: {},
                meta: {
                    code: 200,
                    msg: '提交步数成功!'
                }
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}




module.exports = {
    putSetp,
    getSetp
}