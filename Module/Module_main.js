var dbconfig = require('../util/dbconfig')
// 时间工具类
var timetool = require('./timeTool')
var request = require('request')
// 获取用户的有关设置
getSetp = async (req, res) => {
    var username = req.user.username


    var sql = `SELECT cookie,userId,url,Sprot FROM user WHERE username="${username}"`
    var sqlArr
    var callBack = (err, data) => {
        if (err) {
            res.send({
                data: {},
                meta: {
                    code: 403,
                    msg: 'SQL_ERROR'
                }
            })
            return
        } else {
            data = JSON.parse(JSON.stringify(data))[0]

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

// 设置步数
putSetp = async (req, res) => {
    updata = JSON.parse(JSON.stringify(req.body))
    var username = req.user.username
    // 检查 UserId 是否存在
    if (updata.userId) {
        var userId = updata.userId
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请检查您的UserID'
            }
        })
        return
    }

    // 检查 Url 是否存在,并且进行除请求头处理，只保存用户的参数体，同时保存全部信息等待上传服务器
    if (updata.url) {
        // 带有时间戳的全部url   后续存储到数据库中
        var urlAll = updata.url
        // 正则提取出用户信息和直接写入当前时间
        var urlBody = urlAll.slice(urlAll.search(/[?]/i) + 1, urlAll.search(/[&][t][s][=]/) + 4) + timetool.Timestamp(10)
        var getSetp = 'https://sports.lifesense.com/sport_service/step/getDayStep?' + urlBody + '&measurementDate=' + timetool.Timestamp(13)
        var postSetp = 'https://sports.lifesense.com/sport_service/sport/sport/uploadMobileStepV2?' + urlBody
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
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
                code: 403,
                msg: '请检查您的Cookie'
            }
        })
        return
    }

    // 检查 Setp 是否存在
    if (updata.Sprot) {
        
        var step = updata.Sprot
    } else {
        res.send({
            data: {},
            meta: {
                code: 403,
                msg: '请检查您的Setp是否传入'
            }
        })
        return
    }


    // 获取用户的历史步数信息
    request({
        url: getSetp,
        method: "GET",
        headers: {
            'Cookie': cookie,
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00)',
            'Host': 'sports.lifesense.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
        },
        gzip: true
    }, await function (error, response, body) {
        var data = JSON.parse(JSON.parse(JSON.stringify(body)))
        // 判断是否成功获取信息，并取得相应信息提供提交步数
        if (data.code !== 200) {
            res.send({
                meta: {
                    code: 403,
                    msg: '无权访问，请更新您的设置信息'
                }
            })
            return
        } else {
            // 历史步数
            var lowsetp = data.data.step
            if (lowsetp > step) {
                res.send({
                    code: 400,
                    msg: '请输入更大的步数'
                })
                return
            }
            // 历史移动距离

            var lowdistance = data.data.distance * 1000

            // 历史卡路里消耗
            var lowcalories = data.data.calories

            var postdata ={
                "list": [
                    {
                        "active": 1,
                        // 消耗卡路里 设置随机增大的数
                        "calories": 0.3 * lowcalories + lowcalories+ Math.floor(Math.random()*(10-2+1)+2),
                        "created": timetool.timeFormat('yyyy-MM-dd hh:mm:ss'),
                        "dataSource": 2,
                        "dayMeasurementTime": timetool.timeFormat('yyyy-MM-dd'),
                        "deviceId": "M_NULL",
                        // 运动距离 ，随机增大的数
                        "distance": 0.3 * lowdistance + lowdistance+ Math.floor(Math.random()*(20-3+1)+3),
                        "id": '',
                        "isUpload": 0,
                        "measurementTime": timetool.timeFormat('yyyy-MM-dd hh:mm:ss'),
                        "priority": 0,
                        "step": step,
                        "type": 2,
                        "updated": parseInt(timetool.Timestamp(13)),
                        "userId": userId,
                        "DataSource": 2,
                        "exerciseTime": 0
                    }
                ]
            }
        }
        // 调试用，用于检测发送的数据是否异常
        // console.log(cookie);
        // console.log(postSetp);
        // console.log(postdata);

        

        // 进行提交步数操作
        request({
            url: postSetp,
            method: "POST",
            json: true,
            headers: {
                'Cookie': cookie,
                'Content-Type': 'application/json; charset=utf-8',
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00)',
                'Host': 'sports.lifesense.com',
                'Connection': 'Keep-Alive',
                'Accept-Encoding': 'gzip',
            },
            body: postdata,
            gzip: true
        }, function (error, response, body) {
            console.log(body);
            if (data.code !== 200) {
                res.send({
                    data: {},
                    meta: {
                        code: 403,
                        msg: '禁止访问！请重新获取Cookie等设置信息'
                    }
                })
                return
            } else {
                // 如果正确提交，则将信息保存到数据库中
                var sql = `UPDATE user SET cookie ="${cookie}",userId ="${userId}",url ="${urlAll}",Sprot ="${step}" WHERE username = "${username}"`
                var sqlArr = []
                var callBack = (err, data) => {
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
        })

    })
}










module.exports = {
    putSetp,
    getSetp
}