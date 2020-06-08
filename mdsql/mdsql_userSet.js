var dbconfig = require('../util/dbconfig')



// 获取指定的用户cookie, userId,url,Sprot
getUserSet=(req,res) => {
    let {username} = req.query
    var sql = 'SELECT id,username,cookie,userId,url,Sprot FROM user WHERE username=?'
    var sqlArr = [username]
    var callBack = (err,data) => {
        if (err) {
            console.log(err);
        } else {
            data = data[0]
            if (data !== undefined) {
                res.send({
                    'data' :data,
                    'meta' : {
                        status: 200,
                        msg: 'success'
                    }
                })
            } else {
                res.send({
                    'data' : '',
                    'meta':{
                        status: 404,
                        msg: 'error username'
                    }
                })
            }
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}

// 修改用户cookie, userId,url,Sprot
putUserSet=(req,res) => {
    let putUserSetInfo = {
        username: '测试用户3',
        password: '',
        newcookie: 'newcookie',
        newuserId: 'newuserId',
        newurl: 'newurl',
        newSprot: ''
    }
    var sql = `UPDATE user SET cookie ="${putUserSetInfo.newcookie}",userId="${putUserSetInfo.newuserId}",url ="${putUserSetInfo.newurl}",Sprot ="${putUserSetInfo.newSprot}" WHERE username = "${putUserSetInfo.username}"`
    var sqlArr = []
    var callBack = (err,data)=>{
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)
}


module.exports = {
    getUserSet,
    putUserSet,
}