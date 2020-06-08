// 获取分类
var dbconfig = require('../util/dbconfig')


// 获取最新时间 用于用户注册时间的填写
function getNewTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

// 用户注册
postRegist=(req,res) => {
    updata = JSON.parse(JSON.stringify(req.body))
    // 判断是否有用户
    if (updata.username) {
        var username = updata.username
    } else {
        res.send({
            data: '',
            meta: {
                code: 403,
                msg: '请输入用户名'
            }
        })
        return
    }

    // 判断是否填入密码
    if (updata.password) {
        var password = updata.password
    } else {
        res.send({
            data: '',
            meta: {
                code: 403,
                msg: '请输入密码'
            }
        })
        return
    }

    // 判断是否预留邮箱
    if (updata.email) {
        var email = updata.email
        
    } else {
        res.send({
            data: '',
            meta: {
                code: 403,
                msg: '请输入邮箱'
            }
        })
        return
    }
    const create_time = getNewTime()
    const status = 1
    const category = '用户'
    
    var sql = `INSERT INTO user (username, password,create_time,status,category,email) VALUES("${username}","${password}","${create_time}","${status}","${category}","${email}");`
    var sqlArr = []
    var callBack = (err,data) => {
        if (err) {
            res.send(
                {
                    data: {},
                    meta: {
                        code: 500,
                        meta: '用户名已存在!'
                    }
                }
            )
            return
        } else {
            res.send(
                {
                    data: {},
                    meta: {
                        code: 200,
                        msg: '注册成功,请牢记您的账号密码!'
                    }
                }
            )
            return
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// 修改密码
putuserpwd =(req,res) => {
    updata = JSON.parse(JSON.stringify(req.body))
    console.log(updata);

    // 检测是否传入用户名
    if (updata.username) {
        var username = updata.username
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入用户名!'
            }
        })
        return
    }

    // 检测是否传入密码
    if (updata.password) {
        var lowpassword = updata.password
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入旧密码!'
            }
        })
        return
    }

    // 检测是否传入新密码
    if (updata.newpassword) {
        var newpassword = updata.newpassword
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入新密码!'
            }
        })
        return
    }

    // 根据用户名从数据库中取出比对如果相同则执行修改密码
    var sql = `SELECT password FROM user WHERE username="${username}"`
    var sqlArr = []
    var callBack =(err,userdata) => {
        if (err) {
            res.send({
                data: {},
                meta: {
                    code: 403,
                    msg: 'SQL ERROR!'
                }
            })
            return
        } else if (userdata[0] === undefined) {
            res.send({
                data: {},
                meta: {
                    code: 403,
                    msg: '用户不存在'
                }
            })
            return
        } else {
            // 判断用户传过来的密码和旧密码是否相同,如果相同,则执行修改密码,不同则返回密码错误信息
            if (lowpassword !== JSON.parse(JSON.stringify(userdata))[0].password) {
                res.send({
                    data: {},
                    meta:{
                        code: 403,
                        msg: '旧密码错误!'
                    }
                })
                return
            } else {
                // 如果密码正确,则新密码提交数据库中,返回成功信息
                var sql = `UPDATE user SET password ="${newpassword}" WHERE username = "${username}"`
                var sqlArr = []
                var callBack = (password_err,data)=> {
                    if (password_err) {
                        res.send({
                            data: {},
                            meta: {
                                code: 403,
                                msg: '修改密码异常,请联系管理员!'
                            }
                        })
                        return
                    } else {
                        res.send({
                            data: {},
                            meta: {
                                code: 200,
                                msg: '密码修改成功!请使用新密码登录'
                            }
                        })
                        return
                    }
                }
            }
        }
        dbconfig.sqlConnect(sql, sqlArr, callBack)
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)

    // var sql = `UPDATE user SET password ="${putpwdInfo.newpassword}" WHERE username = "${putpwdInfo.username}"`
    // var sqlArr = []
    // var callBack = (err,data) => {
        
    //     if (err) {
    //         console.log(err);
            
    //     } else {
    //         res.send(data)
    //     }
    // }
    // dbconfig.sqlConnect(sql, sqlArr, callBack)
}
// 找回密码
RecoverPwd =(req,res) => {
    var updata =  JSON.parse(JSON.stringify(req.body))
    
    // 检验是否传入username
    if (updata.username) {
        var username = updata.username
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入用户名！'
            }
        })
        return
    }

    // 检查是否传入 新密码
    if (updata.newpassword) {
        var newpassword = updata.newpassword
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入密码！'
            }
        })
        return
    }

    // 检验是否传入email
    if (updata.email) {
        var email = updata.email
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请输入邮箱！'
            }
        })
        return
    }
    // 查询数据库中是否存在username值的用户
    // 判断用户是否存在，如果存在则校验邮箱是否正确
    var sql = `SELECT username,email FROM user WHERE username="${username}"`
    var sqlArr =[]
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
            // 校验用户是否存在，如果不存在，数据库返回空数据
        } else if (data[0] === undefined){
             res.send({
                 data: {},
                 meta: {
                     code: 403,
                     msg: '用户不存在!'
                 }
             })
            return
        } else {
            // 判断邮箱是否相同 
            // 如果相同，则根据传来的 username 进行修改密码操作
            if (JSON.parse(JSON.stringify(data))[0].email === email) {
                const sql = `UPDATE user SET password ="${newpassword}" WHERE username = "${username}"`
                const sqlArr = []
                const callBack = (err,putdata) => {
                    if (err) {
                        res.send({
                            data: {},
                            meta: {
                                code: 403,
                                msg: '修改密码失败，请联系管理员'
                            }
                        })
                        return
                    } else{
                        res.send({
                            data: {},
                            meta: {
                                code: 200,
                                msg: '修改密码成功！请使用新密码登录'  
                            }
                        })
                        return
                    }
                }
                dbconfig.sqlConnect(sql, sqlArr, callBack)
            }else{
                res.send({
                    data: {},
                    meta: {
                        code: 403,
                        msg: '请检查邮箱是否正确'
                    }
                })
                return
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {
    postRegist,
    putuserpwd,
    RecoverPwd
}