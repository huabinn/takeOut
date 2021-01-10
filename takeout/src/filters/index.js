import Vue from 'vue'
import format from 'date-fns/format'

// 自定义过滤器
Vue.filter('date-format', function (value, formatStr = 'YYY-MM-dd HH:mm:ss') {
    return format(value, formatStr)
})