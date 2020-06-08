var timetool = require('./timeTool') 
var request = require('request')


var main = (cookie,url,userId,step)=> {
    
// 用户COOKIE
var cookie = cookie
// url + 10位时间戳
var url = url + timetool.Timestamp(10)

// 不重要的ID，可以为空
var id = ''
// 用户的ID
var userId = '26480340'
// 设置的步数，类型为int
var step = step

// 2020-06-06 23:46:37
// 运动后的时间
// 字符串
var created = timetool.timeFormat('yyyy-MM-dd hh:mm:ss')

// 2020-06-06
// 当前日期
// 字符串
var dayMeasurementTime = timetool.timeFormat('yyyy-MM-dd')

// 当前时间
// 2020-06-06 23:46:37
// 字符串
var measurementTime = timetool.timeFormat('yyyy-MM-dd hh:mm:ss')

// 上传时间
// 1591458397000
// int型
var updated = parseInt(timetool.Timestamp(13))

// 需要传入的数据
var requetsData = {
    "list": [
        {
            "active": 1,
            "calories": 0,
            "created": created,
            "dataSource": 2,
            "dayMeasurementTime": dayMeasurementTime,
            "deviceId": "M_NULL",
            "distance": 12,
            "id": id,
            "isUpload": 0,
            "measurementTime": measurementTime,
            "priority": 0,
            "step": step,
            "type": 2,
            "updated": updated,
            "userId": userId,
            "DataSource": 2,
            "exerciseTime": 0
        }
    ]
}

request({
    url: url,
    method: "POST",
    json: true,
    headers:{
        'Cookie': cookie,
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00)',
        'Host': 'sports.lifesense.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
    },
    body: requetsData,
    gzip:true
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        return  200 
    } else {
        return  500
    }
}); 
}

module.exports = {
    main
}