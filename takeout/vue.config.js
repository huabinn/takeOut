module.exports = {
    devServer: {
        proxy:{
            '/api': {
                target: 'http://localhost:8000', //你要访问的服务器域名
                changeOrigin: true, //允许跨域
                pathRewrite: {        
                    '^/api': ''
                }
            }
        }
    }
}