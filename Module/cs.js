var request = require('request');
const { response } = require('../app');
const { log } = require('util');


csget = (req,res) => {
    console.log(req.body);

    const appid = 'wxf36f8d6d45601178'
    const secret = '1c58a355baf3c1a2acd33840e7e4b513'
    const js_code = req.body.token
    const grant_type = 'authorization_code'
    request.get(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=${grant_type}`,
         function(err, Response, body){
        //  拿到用户唯一标识，存入数据库中，根据这个返回用户数据
        // console.log(JSON.parse(body).openid);
        console.log(Response.statusCode);
        if (Response.statusCode !== 200) {
            res.send({
                data: { },
                meta: {
                    code: Response.statusCode,
                    msg: 'login error'
                }
            })
            return
        } else {
            res.send({
                data: {
                    session_key: JSON.parse(body).session_key
                },
                meta: {
                    code: 200,
                    msg: 'login success'
                }
            })
            return
        }
        
        
    });
}

cspost = (req,res)=>{
    console.log(req.body);
    
    // res.send(
    //     {
    //         data: JSON.parse(JSON.stringify(req.body))
    //     }
    // )
}



module.exports = {
    csget,
    cspost
}