const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/takeout', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('connected', function () {
    console.log('数据库连接成功!')
})

const {Schema} = mongoose

let userSchema = new Schema({
    name: {
        type: String,
        default: 'admin' + Date.now
    },
    phone: {
        type: String
    },
    pwd: {
        type: String
    },
    // 创建时间
    created_time: {
        type: Date,
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/images/avatar-default.png'
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
       type: Date
    }
})

module.exports = mongoose.model('User', userSchema)
