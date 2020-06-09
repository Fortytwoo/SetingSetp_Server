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
/**
 * @api {get} /index 请求首页数据
 * @apiVersion 1.0.0
 * @apiName 获取首页数据
 * @apiGroup index
 *
 *
 * @apiSuccess {Number} flag 是否获取到数据 1成功 0失败
 * @apiSuccess {Array} books 返回书籍内容
 * @apiSuccess {String} msg  返回信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "flag": 1,
 *      "books": [
 *          {
 *             "_id": "5816b415b06d1d32157790b1",
 *            "title": "圣墟",
 *            "author": "辰东",
 *            "shortIntro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
 *            "cover": "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F1228859%2F1228859_fac7917a960547eb953edf0b740cef3a.jpg%2F",
 *            "site": "zhuishuvip",
 *            "majorCate": "玄幻",
 *            "minorCate": "东方玄幻",
 *            "allowMonthly": false,
 *            "banned": 0,
 *            "latelyFollower": 283375,
 *            "retentionRatio": "73.42"
 *          }
 *      ],
 *      "msg": "OK"
 *    }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     { "flag": 0, "msg": "rankingId有问题" }
 */
