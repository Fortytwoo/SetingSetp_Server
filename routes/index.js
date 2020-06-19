var express = require('express')
var router = express.Router()
var users = require('../Module/users')
var setSetp = require('../Module/Module_main')
// 测试接口
var cs = require('../Module/cs')
// 微信登录接口
var wxLogin = require('../Module/wx/login')
// 微信修改步数接口
var wxPutSteps = require('../Module/wx/putSteps')


// 微信绑定用户名接口
var wxBindUser = require('../Module/wx/binduser')
// 微信修改接口
// 设置参数      
// 修改密码    
var wxputParameter = require('../Module/wx/putParameter')
// 微信消息推送接口
var wxMessage = require('../Module/wx/wxMessage')




// 注册
router.post('/regist',users.postRegist)
// Web网页登录
router.post('/login',users.findUser)
// 获取用户信息设置
router.get('/getSetp',setSetp.getSetp)
// 修改密码
router.put('/putuserpwd',users.putuserpwd)
// 找回密码
router.post('/RecoverPwd',users.RecoverPwd)


// 修改步数
router.put('/putSetp',setSetp.putSetp)

// 微信小程序登录接口
router.get('/wxapp/login',wxLogin.login)
// 微信小程序设置步数接口
router.post('/wxapp/putSteps',wxPutSteps.putSteps)


// 微信小程序绑定Web账号接口
router.post('/wxapp/binduser',wxBindUser.binduser)
// 设置参数
router.post('/wxapp/settingParameter',wxputParameter.settingParameter)
// 修改密码
router.post('/wxapp/putPassword',wxputParameter.putPassword)

// 微信小程序消息推送接口
router.post('/wxMessage/verificationNews',wxMessage.verificationNews)


// 测试API
router.post('/csget',cs.csget)
router.post('/cspost',cs.cspost)
module.exports = router;