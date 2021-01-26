// npm i express body-parser express-session mongoose axios blueimp-md5 body-parser --save

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const router = require('./router/router')

let app = express()

// 暴露文件
app.use('/public/', express.static(path.join(__dirname, '/public/')))

app.set('views', path.join(__dirname, '/views/'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// npm i express-session --save      保持登录状态
app.use(session({
    // 加密
    secret: 'binn',
    // 设置 cookie 存活一天
    cookie: {maxAge: 1000*60*60*24},
    resave: false,
    saveUninitialized: true
}))

app.use(router)

app.use((req, res, next) => {
    res.send('404 Not Found')
    next(err);
});
  
// error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
});

app.listen(8000, () => {
    console.log('running');
})
