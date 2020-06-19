var dbconfig = require('../../util/dbconfig')
// 时间工具类
var request = require('request')



// 提供的参数

// 微信小程序绑定Web端设置
binduser = (req,res) => {
    var email = req.body.email
    var password = req.body.password
    var username = req.body.username
    var vaildPassword = req.body.vaildPassword
    var openid = req.body.openid

    valid(email)
    valid(password)
    valid(username)
    valid(vaildPassword)
    valid(openid)

    // 查找openid，并往openid写入数据
    var sql = `UPDATE user SET email= "${email}",password = "${password}",username = "${username}" WHERE openid = "${openid}"`
    var sqlArr = []
    var callBack = (err,data)=>{
        if (err) {
            if(err.sqlMessage === "Duplicate entry '123456' for key 'username'") {
                res.send({
                    data:{},
                    meta:{
                        code:403,
                        msg: '该用户名已注册'
                    }
                    })
                    return
                }else{
                res.send({
                data: {},
                meta:{
                    code:403,
                    msg:'SQL_ERROR!'
                }
            })
            return
                }
        } else{
            res.send({
                data: {},
                meta: {
                    code: 200,
                    msg: '绑定成功！'
                }
            })
        }
    }
    dbconfig.sqlConnect(sql, sqlArr, callBack)

}

var valid = (variable)=> {
    if (variable === '' && variable === undefined) {
        res.send({
            data:{},
            meta: {
                code:403,
                msg: `请检查您的${variable}`
            }
        })
        return
    }
}


module.exports = {
    binduser
}



