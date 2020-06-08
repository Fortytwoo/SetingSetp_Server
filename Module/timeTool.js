
// 修改Date原型
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}    

Timestamp = (timesNum)=> {
    // 需要几位就输入几位的时间戳
    // 返回类型为字符串
    let time = Date.parse( new Date() ).toString();
    time = time.substr(0,timesNum);
    return time
}

// 格式化输出字符串 YYYY年-MM月-dd日 HH时：mm分:ss秒   按需输出 返回结果为字符串
timeFormat = (timefm) =>{
    var time1 = new Date().format(`${timefm}`)
    return time1
}
console.log(timeFormat('yyyy-MM-dd hh:mm:ss'));

// 2020-06-06 23:46:37
// 2020-06-06
module.exports = {
    Timestamp,
    timeFormat
}

