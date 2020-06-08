var express = require('express')
var router = express.Router()
var users = require('../Module/users')
var setSetp = require('../Module/Module_main')
var cs = require('../Module/cs')

// 注册
router.post('/regist',users.postRegist)
// 登录
router.post('/login',users.findUser)
// 获取用户信息设置
router.get('/getSetp',setSetp.getSetp)
// 修改密码
router.put('/putuserpwd',users.putuserpwd)
// 找回密码
router.post('/RecoverPwd',users.RecoverPwd)


// 修改步数
router.put('/putSetp',setSetp.putSetp)

// 测试API
router.post('/csget',cs.csget)
router.post('/cspost',cs.cspost)
module.exports = router;
