var dbconfig = require('../../util/dbconfig')




// 修改密码
putPassword = (req,res) => {
    updata = JSON.parse(JSON.stringify(req.body))

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
    if (updata.lowpassword) {
        var lowpassword = updata.lowpassword
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
}

// 修改参数

settingParameter = (req,res)=> {
   const Sprot = req.body.Sprot
   const cookie = req.body.cookie
   const url = req.body.url
   const userId = req.body.userId
   const openid = req.body.openid 
   
  switch (false) {
      case Sprot:
          res.send({data:{},meta:{code:403,msg:'请检查您的Sprot'}})
          break;
        case cookie:
          res.send({data:{},meta:{code:403,msg:'请检查您的cookie'}})
          break;
        case url:
          res.send({data:{},meta:{code:403,msg:'请检查您的url'}})
          break;   
        case userId:
          res.send({data:{},meta:{code:403,msg:'请检查您的userId'}})
          break;
        case openid:
          res.send({data:{},meta:{code:403,msg:'请检查您的openid'}})
          break;   
      default:
          break;
  }
   // 如果正确提交，则将信息保存到数据库中
   var sql = `UPDATE user SET cookie ="${cookie}",userId ="${String(Number(userId)-1000000)}",url ="${url}",Sprot ="${Sprot}" WHERE openid = "${openid}"`
   var sqlArr = []
   var callBack = (err, data) => {
               console.log(err)
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
                   msg: '提交参数成功!'
               }
           })
       }
   }
   dbconfig.sqlConnect(sql, sqlArr, callBack)

}

module.exports = {
    putPassword,
    settingParameter
}