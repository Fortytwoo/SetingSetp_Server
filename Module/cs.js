


csget = (req,res) => {
    var a = {
        u1: 's1',
        u2: 's2',
        u3: 's3'
    }
    for (let index = 0; index < a.length; index++) {
        if (a[index] === req.query.a) {
            res.send({
                data: a[index]
            })
            return
        } else {
            res.send({
                data: '没有该项'
            })
            return
        }
    }
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