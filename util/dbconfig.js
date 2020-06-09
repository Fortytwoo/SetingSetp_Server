const mysql = require('mysql')


module.exports = {
//数据库配置
    config :{
        host: '127.0.0.1',
        port: '3306',
        username: 'app_Motion',
        password: '12345678',
        database: 'app_Motion'
    },
    // 连接数据库，使用mysql连接池的方式连接
    sqlConnect:function(sql, sqlArr, callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((error, conn) => {
            if (error) {
                console.log('数据库连接失败');
                console.log(error);
                return
            } else {
                console.log('数据库连接成功');
            }
            // 事件驱动回调
            conn.query(sql, sqlArr, callBack)
            // 释放连接
            conn.release()
        })
    }

}