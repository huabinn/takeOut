<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">广药外卖</h2>
          <div class="login_header_title">
            <a href="#" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
            <a href="#" :class="{on: !loginWay}"  @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <!-- 短信登录 -->
            <div :class="{on: loginWay}">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification"
                        :class="{right_phone: rightPhone}" @click.prevent="getCode">
                        {{computeTime>=0? `已发送(${computeTime}s)` : '获取验证码'}}</button>
                        <!-- click.prevent阻止提交表单的默认事件 -->
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册广药外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="#">《用户服务协议》</a>
              </section>
            </div>
            <!-- 密码登录 -->
            <div :class="{on: !loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <div class="switch_button" :class="showPwd? 'on' : 'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right: showPwd}"></div>
                    <span class="switch_text">{{showPwd? 'abc' : ''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <!-- http://localhost:8000/captcha 显示验证码的svg图片 -->
                  <img class="get_verification" src="http://localhost:8000/captcha"
                       @click="getCaptcha" alt="captcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="#" class="about_us">关于我们</a>
        </div>
        <a href="#" class="go_back" @click="$router.back()">
          <i class="iconfont icon-arrow-left"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
  export default {
      data () {
        return {
          loginWay: true,      //true代表短信登录，false代表密码登录
          computeTime: -1,      // 验证码倒计时  
          showPwd: false,      //密码的显示隐藏
          phone: '',           //电话号码            
          code: '',            //短信验证码
          name: '',            //用户名
          pwd: '',             //密码
          captcha: '',         //图形验证码
          alertText: '',       //提示信息
          alertShow: false,    //是否提示信息
        }
      },

      computed: {
        rightPhone () {
          return /^1[3-9]\d{9}$/.test(this.phone)
        }
      },

      methods: {
        // 异步获取验证码
        async getCode () {
          if (this.computeTime<0) {
            // 开始倒计时
            this.computeTime = 10
            this.intervalId = setInterval(() => {
              this.computeTime--
              if (this.computeTime < 0) {
                clearInterval(intervalId)
              }
            }, 1000);
            // 发送ajax请求获取验证码
            const result = await reqSendCode(this.phone)
            if (result.code === 1) { //发送短信失败
              // 提示失败
              this.showAlert(result.msg)
              // 停止倒计时
              if (this.computeTime) {
                this.computeTime = -1
                clearInterval(this.intervalId)
              }
            }
          }
        },
        // 打开警示框
        showAlert (alertText) {
          this.alertText = alertText
          this.alertShow = true
        },
        // 异步登陆
        async login () {
          let result
          // 前台表单验证
          if (this.loginWay) {      //短信登录
            const {rightPhone, phone, code} = this
            if (!this.rightPhone) {
              // 手机号码不正确
              this.showAlert('手机号码不正确')
              return
            } else if (!/^\d{6}$/.test(code)) {
              // 验证码必须是6位数字
              this.showAlert('验证码必须是6位数字')
              return
            }
            // 发送ajax请求 短信登录
            result = await reqSmsLogin(phone, code)
            
          } else {                  //密码登录
            const {name, pwd, captcha} = this
            if (!this.name) {
              // 用户名必须指定
              this.showAlert('用户名必须指定')
              return
            } else if (!this.pwd) {
              // 密码必须指定
              this.showAlert('密码必须指定')
              return
            } else if (!this.captcha) {
              // 验证码错误
              this.showAlert('验证码必须指定')
              return
            }
            result = await reqPwdLogin({name, pwd, captcha})
            
          }
          // 根据结果处理数据
          if (result.code === 0) {
            const user = result.data
            // 将 user 保存到vuex的state
            this.$store.dispatch('recordUser', user)
            // 去个人中心页面 路由 /profile
            this.$router.replace('/profile')
          } else {
            const msg = result.msg
            // 更新图形验证码
            this.getCaptcha()
            // 弹窗报错
            this.showAlert(msg)
          }
        },
        // 关闭警示框
        closeTip () {
          this.alertShow = false
          this.alertText = ''
        },
        // 获取动态一次性验证码
        getCaptcha () {
          // 每次指定的 src 值，都要变化
          this.$refs.captcha.src = 'http://localhost:8000/captcha?time' + Date.now()
        },

      },


      components: {
        AlertTip
      }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color rgba(98,99,101,.8)
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color rgba(98,99,101,.8)
                font-weight 700
                border-bottom 2px solid rgba(98,99,101,.8)
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid rgba(98,99,101,.8)
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color #000
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background rgba(98,99,101,.8)
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color rgba(98,99,101,.8)
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 5px
              background rgba(98,99,101,.8)
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border none
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 26px
            color #999
</style>
