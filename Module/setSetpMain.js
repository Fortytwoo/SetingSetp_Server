// var timetool = require('./timeTool') 
// var request = require('request')


// var main = new Promise((cookie,url,userId,step)=> {
    
// // 用户COOKIE
// var cookie = cookie
// // url + 10位时间戳
// var url = url + timetool.Timestamp(10)

// // 不重要的ID，可以为空
// var id = ''
// // 用户的ID
// var userId = '26480340'
// // 设置的步数，类型为int
// var step = step

// // 2020-06-06 23:46:37
// // 运动后的时间
// // 字符串
// var created = timetool.timeFormat('yyyy-MM-dd hh:mm:ss')

// // 2020-06-06
// // 当前日期
// // 字符串
// var dayMeasurementTime = timetool.timeFormat('yyyy-MM-dd')

// // 当前时间
// // 2020-06-06 23:46:37
// // 字符串
// var measurementTime = timetool.timeFormat('yyyy-MM-dd hh:mm:ss')

// // 上传时间
// // 1591458397000
// // int型
// var updated = parseInt(timetool.Timestamp(13))

// // 需要传入的数据
// var requetsData = {
//     "list": [
//         {
//             "active": 1,
//             "calories": 8.761541,
//             "created": created,
//             "dataSource": 2,
//             "dayMeasurementTime": dayMeasurementTime,
//             "deviceId": "M_NULL",
//             "distance": 21,
//             "id": id,
//             "isUpload": 0,
//             "measurementTime": measurementTime,
//             "priority": 0,
//             "step": step,
//             "type": 2,
//             "updated": updated,
//             "userId": userId,
//             "DataSource": 2,
//             "exerciseTime": 0
//         }
//     ]
// }
// console.log('运行前');

// request({
//     url: url,
//     method: "POST",
//     json: true,
//     headers:{
//         'Cookie': cookie,
//         'Content-Type': 'application/json; charset=utf-8',
//         'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00)',
//         'Host': 'sports.lifesense.com',
//         'Connection': 'Keep-Alive',
//         'Accept-Encoding': 'gzip',
//     },
//     body: requetsData,
//     gzip:true
// }, function(error, response, body)  {
//     // 将step:中的字符串以'，'分割为数组然后取倒数第二位数字为上次提交的步数
//     // step字符串：step: '0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,314,316,316',
//     // const data = await JSON.parse(JSON.stringify(body)).data.pedometerRecordHourlyList[0].step.split(',')
//     // const lowSetp =  data[data.length-2]
//     console.log('1');
//     // var lowSetp = 200
//     if (200 === 200) {
//         console.log('ok');
        
//     } else {
//         console.log(error);
        
//     }
// }).then((result) => {
    
//     console.log(1);
//     return result
// }).catch((err) => {
//     console.log(err);
// });
// })

// module.exports = {
//     main
// }