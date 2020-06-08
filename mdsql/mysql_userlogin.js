// 获取分类
var dbconfig = require('../util/dbconfig')




// login
findUser = (req, res)=> {
    // req.body => JSONstringfy => json.parse 
    const updata =  JSON.parse(JSON.stringify(req.body))
    
    if (updata.username) {
        var username = updata.username
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入用户名或密码！'
            }
        })
        return
    }
    if (updata.password) {
        var password = updata.password
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入用户名或密码！'
            }
        })
        return
    }
    // var username = 'admin'
    var sql = `SELECT username,password FROM user WHERE username="${username}"`
    var sqlArr = []
    var callBack = (err,data)=> {
        if (err) {
            res.send(err)
            return
        } else {
            // 验证账号是否正确
            if (data[0] === undefined) {
                res.send({
                    data: '',
                    meta: {
                        code: 403,
                        msg: '登录失败，密码或用户名错误！'
                    }
                })
                return
            }
            // 转换为JSON
            data = JSON.parse(JSON.stringify(data))
            // 判断密码是否正确
            if (data[0].password === password) {
                res.send({
                    data:  '',
                    meta: {
                        code: 200,
                        msg: `登录成功！ 你好${data[0].username}!`
                    }
                })
                return
            } else {
                res.send({
                    data: '',
                    meta: {
                        code: 403,
                        msg: '登录失败，密码或用户名错误！'
                    }
                })
                return
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// 设置步数
putSetp =(req,res) => {
    updata = JSON.parse(JSON.stringify(req.body))
    console.log(updata);

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

    if (updata.username) {
        var username = updata.username
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
    findUser,
    putSetp
}