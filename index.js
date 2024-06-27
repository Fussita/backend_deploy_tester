
const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/public') )

app.get('/root', (req, res) => {
    console.log( ' ipAddress:' + req.ip )
    res.send({
        status: 200
    })
})

app.listen(3000, () => {
    console.log(' server init on 3000 ')
})