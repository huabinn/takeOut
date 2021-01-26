const express = require('express')
const fs = require('fs')
const path = require('path')
const sms_util = require('../util/sms_util')
let User = require('../models/user')
// npm i blueimp-md5 --save     密码加密
const md5 = require('blueimp-md5')
const users = {}
const ajax = require('../api/ajax')
var svgCaptcha = require('svg-captcha')

let router = express.Router()

// 根据经纬度获取位置详情
router.get('/position/:geohash', (req, res) => {
    const {geohash} = req.params
    ajax(`http://cangdu.org:8001/v2/pois/${geohash}`)
        .then(data => {
            res.send({code: 0, data})
        })
})

// 2、获取食品分类列表
router.get('/index_category', (req, res) => {
    setTimeout(() => {
        const data = require('../data/index_category.json')
        res.send({code: 0, data})
    }, 300)
})

// 3、根据经纬度获取商铺列表
router.get('/shops', (req, res) => {
    const latitude = req.query.latitude
    const longitude = req.query.longitude
  
    setTimeout(() => {
        const data = require('../data/shops.json')
        res.send({code: 0, data})
    }, 300)
})

// 4、根据经纬度和关键字搜索商铺列表
router.get('/search_shops', (req, res) => {
    const {geohash, keyword} = req.query
    setTimeout(() => {
        const datas = require('../data/shops.json')
        const data = datas.filter(shop => shop.name === keyword)
        res.send({code: 0, data})
    }, 300);
})


// 一次性图形验证码
router.get('/captcha', (req, res) => {
    let captcha = svgCaptcha.create({
        ignoreChars: '0o1l',
        noise: 2,
        color: true
    });
    req.session.captcha = captcha.text.toLowerCase();
    console.log(req.session.captcha)
    /*res.type('svg');
    res.status(200).send(captcha.data);*/
    res.type('svg');
    res.send(captcha.data)
});

// 5、用户名密码登陆
router.post('/login_pwd', (req, res) => {
    const name = req.body.name
    const pwd = md5(req.body.pwd)
    const captcha = req.body.captcha.toLowerCase()
    console.log('/login_pwd', name, pwd, captcha, req.session)
    
    // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
    if(captcha!==req.session.captcha) {
        return res.send({code: 1, msg: '验证码不正确'})
    }
    // 删除保存的验证码
    delete req.session.captcha

    User.findOne({name}, (err, user) => {
        if (user) {
            console.log('findUser', user)
            if (user.pwd !== pwd) {
                res.send({code: 1, msg: '用户名或密码不正确!'})
            } else {
                req.session.userid = user._id
                res.send({code: 0, data: {_id: user._id, name: user.name, phone: user.phone}})
            }
        } else {
        const userModel = new User({name, pwd})
        userModel.save((err, user) => {
            // 向浏览器端返回cookie(key=value)
            // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
            req.session.userid = user._id
            const data = {_id: user._id, name: user.name}
            // 3.2. 返回数据(新的user)
            res.send({code: 0, data})
        })
        }
    })
})

// 6、发送短信验证码
router.get('/sendcode', (req, res, next) => {
    //1. 获取请求参数数据
    const phone = req.query.phone;
    //2. 处理数据
    //生成验证码(6位随机数)
    var code = sms_util.randomCode(6);
    //发送给指定的手机号
    console.log(`向${phone}发送验证码短信: ${code}`);
    sms_util.sendCode(phone, code, (success) => {//success表示是否成功
        if (success) {
            // 保存验证码信息
            users[phone] = code
            console.log('保存验证码: ', phone, code)
            res.send({"code": 0})
        } else {
            //3. 返回响应数据
            res.send({"code": 1, msg: '短信验证码发送失败'})
        }
    })
})

// 7、手机号验证码登陆
router.post('/login_sms', (req, res, next) => {
    const phone = req.body.phone;
    const code = req.body.code;
    console.log('/login_sms', phone, code)
    // 对照验证码信息
    if (users[phone] != code) {
      res.send({code: 1, msg: '手机号或验证码不正确'});
      return;
    }
    //删除保存的code
    delete users[phone];
  
  
    User.findOne({phone}, (err, user) => {
        if (user) {
            req.session.userid = user._id
            res.send({code: 0, data: user})
        } else {
            //存储数据
            const userModel = new User({phone})
            userModel.save((err, user) => {
                req.session.userid = user._id
                res.send({code: 0, data: user})
            })
        }
    })
  
})

// 8、根据会话获取用户信息
router.get('/userinfo', (req, res) => {
    // 取出userid
    const userid = req.session.userid
    // 查询
    User.findOne({
        _id: userid
    }, {
        // 查询时过滤掉
        'pwd': 0, '__v': 0
    }, (err, user) => {
        // 如果没有, 返回错误提示
        if (!user) {
            // 清除浏览器保存的userid的cookie
            delete req.session.userid
    
            res.send({code: 1, msg: '请先登陆'})
        } else {
            // 如果有, 返回user
            res.send({code: 0, data: user})
        }
    })
})

// 9、用户登出
router.get('/logout', (req, res) => {
    // 清除浏览器保存的userid的cookie
    delete req.session.userid
    // 返回数据
    res.send({code: 0})
})

// 根据商家 id 获取商家信息
router.get('/shop_info', (req, res) => {
    let id = null
    if (req.query.id != 'undefined') {
        id = req.query.id
    } else {
        // 子路由刷新 使用缓存
        id = req.session.shopid
    }
    setTimeout(() => {
        const datas = require('../data/shop.json')
        const data = datas.filter(shop => shop.id === id)
        req.session.shopid = id
        // console.log(req.session.shopid);
        res.send({code: 0, data: data[0].info})
    }, 300)
})

// 根据商家 id 获取商家信息
router.get('/shop_ratings', (req, res) => {
    const id = req.session.shopid
    const datas = require('../data/shop.json')
    const data = datas.filter(shop => shop.id === id)
    // console.log(req.session.shopid);
    res.send({code: 0, data: data[0].ratings})
})

router.get('/shop_goods', (req, res) => {
    let id = null
    if (req.query.id != 'undefined') {
        id = req.query.id
    } else {
        // 子路由刷新 使用缓存
        id = req.session.shopid
    }
    const datas = require('../data/shop.json')
    const data = datas.filter(shop => shop.id === id)
    // console.log(req.session.shopid);
    res.send({code: 0, data: data[0].goods})
})
module.exports = router
