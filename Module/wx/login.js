var dbconfig = require('../../util/dbconfig')
// 时间工具类
var timetool = require('../timeTool')
var request = require('request')


// 微信小程序第一次登录以及注册
login = (req, res) => {
    // 传入js_code，以url传参方式
    
    const appid = 'wxf36f8d6d45601178'
    const secret = '1c58a355baf3c1a2acd33840e7e4b513'
    const js_code = req.query.js_code
    const grant_type = 'authorization_code'
    request.get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=${grant_type}`,
        function (err, Response, body) {
            //  拿到用户唯一标识，存入数据库中，根据这个返回用户数据
            if (JSON.parse(Response.body).errcode !== undefined) {
                res.send({
                    data: {},
                    meta: {
                        code: JSON.parse(Response.body).errcode,
                        msg: 'login error'
                    }
                })
                return
            } else {
                //  拿到用户唯一标识，存入数据库中，根据这个返回用户数据
                const openid = JSON.parse(body).openid
                // 根据openid查询数据库，如果有则返回用户设置。
                // 如果没有则创建用户

                // 根据openid搜索是否有该用户
                sql = `SELECT cookie,userId,url,Sprot,username,create_time FROM user WHERE openid="${openid}"`,
                    sqlArr = [],
                    callBack = (err, data) => {
                        if (err) {
                            res.send({
                                data: {},
                                meta: {
                                    code: 500,
                                    msg: 'DATABASE ERROR !'
                                }
                            })
                            return
                        } else {
                            var data = JSON.parse(JSON.stringify(data))[0]
                            if (data) {
                                // 返回老用户的信息
                                var lowtimes = Date.parse(data.create_time)
                                var newtimes = Date.parse(new Date())
                                res.send({
                                    data: {
                                        create_time: Number((newtimes - lowtimes)/1000/60/60/24).toFixed(1),
                                        username: data.username,
                                        cookie: data.cookie,
                                        userId: data.userId,
                                        url: data.url,
                                        Sprot: data.Sprot,
                                        session_key: JSON.parse(body).session_key,
                                        openid: openid
                                    },
                                    meta: {
                                        code: 200,
                                        msg: 'login success'
                                    }
                                })
                                return
                            } else {
                                // 如果步数老用户（数据库中查询不到相同的openid）
                                // 则创建新用户
                                // 初始化用户信息
                                // 注册时间
                                const create_time = timetool.timeFormat('yyyy-MM-dd hh:mm:ss')
                                // 账号状态（0为禁用，禁止登录）
                                const status = 1
                                // 用户类型
                                const category = 'user'

                                sql = `INSERT INTO user (create_time,status,category,openid) VALUES("${create_time}","${status}","${category}","${openid}");`,
                                    sqlArr = [],
                                    callBack = (err, data) => {
                                        if (err) {
                                            res.send({
                                                data: {},
                                                meta: {
                                                    code: 500,
                                                    msg: 'DATABASE ERROR!'
                                                }

                                            })
                                            return
                                        } else {
                                            res.send({
                                                data: {
                                                    create_time: '0.0',
                                                    username: null,
                                                    cookie: ``,
                                                    userId: ``,
                                                    url: ``,
                                                    Sprot: 520,
                                                    session_key: JSON.parse(body).session_key
                                                },
                                                meta: {
                                                    code: 201,
                                                    msg: 'new user login success!'
                                                }
                                            })
                                        }
                                    }
                                dbconfig.sqlConnect(sql, sqlArr, callBack)
                            }
                        }

                    }
                
            }
            dbconfig.sqlConnect(sql, sqlArr, callBack)
        });
}


module.exports = {
    login
}