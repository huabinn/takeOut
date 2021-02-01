<template>
  <section class="profile">
    <HeaderTop title="我的">
    </HeaderTop>
    <section class="profile-number">
      <router-link :to="userInfo._id? '/userInfo' : '/login'" class="profile-link">
        <div class="profile_image">
          <!-- <i class="iconfont icon-bussiness-man-fill"></i> -->
          <!-- <img src="http://localhost:8000/public/images/avatar-default.png" alt=""> -->
          <img :src="userInfo.avatar? baseUrl + userInfo.avatar : 'http://localhost:8000/public/images/avatar-default.png'" alt="">
        </div>
        <div class="user-info">
          <p class="user-info-top">{{userInfo.name || '登录/注册'}}</p>
          <p>
            <span class="user-icon">
              <i class="iconfont icon-mobile-phone"></i>
            </span>
            <span class="icon-mobile-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
          </p>
        </div>
        <span class="arrow">
          <i class="iconfont icon-arrow-right"></i>
        </span>
      </router-link>
    </section>
    <section class="profile_info_data border-1px">
      <ul class="info_data_list">
        <a href="#" class="info_data_link">
          <span class="info_data_top"><span>0.00</span>元</span>
          <span class="info_data_bottom">我的余额</span>
        </a>
        <a href="#" class="info_data_link">
          <span class="info_data_top"><span>0</span>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </a>
        <a href="#" class="info_data_link">
          <span class="info_data_top"><span>0</span>分</span>
          <span class="info_data_bottom">我的积分</span>
        </a>
      </ul>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 我的订单 -->
      <a href='#' class="my_order">
        <span>
          <i class="iconfont icon-suggest"></i>
        </span>
        <div class="my_order_div">
          <span>我的订单</span>
          <span class="my_order_icon">
            <i class="iconfont icon-arrow-right"></i>
          </span>
        </div>
      </a>
      <!-- 积分商城 -->
      <a href='#' class="my_order">
        <span>
          <i class="iconfont icon-extra-inquiries"></i>
        </span>
        <div class="my_order_div">
          <span>积分商城</span>
          <span class="my_order_icon">
            <i class="iconfont icon-arrow-right"></i>
          </span>
        </div>
      </a>
      <!-- 广药外卖会员卡 -->
      <a href="#" class="my_order">
        <span>
          <i class="iconfont icon-brand"></i>
        </span>
        <div class="my_order_div">
          <span>广药外卖会员卡</span>
          <span class="my_order_icon">
            <i class="iconfont icon-arrow-right"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 服务中心 -->
      <a href="#" class="my_order">
        <span>
          <i class="iconfont icon-company"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon">
            <i class="iconfont icon-arrow-right"></i>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_my_order border-1px">
      <!-- 退出登录按钮 -->
      <mt-button type="danger" style="width: 100%" v-if="userInfo._id" @click="logout">退出登录</mt-button>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import {MessageBox, Toast} from 'mint-ui'
  import HeaderTop from "../../components/HeaderTop/HeaderTop"
  export default {
    data () {
      return {
        baseUrl: 'http://localhost:8000'    
      }
    },

    computed: {
      ...mapState(['userInfo'])
    },

    methods: {
      logout () {
        MessageBox.confirm('确认退出吗?').then(
          action => {
            // 请求退出登陆
            this.$store.dispatch('logout')
            Toast('退出登录')
          },
          action => {
            console.log('点击取消');
          }
        )
      }
    },
    
    components: {
        HeaderTop
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "../../common/stylus/mixins.styl"
    .profile //我的
        width 100%
        .profile-number
            margin-top 45.5px
            .profile-link
              clearFix()
              position relative
              display block
              background rgba(98,99,101,.8)
              padding 20px 10px
              .profile_image
                float left
                width 60px
                height 60px
                border-radius 50%
                overflow hidden
                vertical-align top
                >img
                  width 100%
                  height 100%
              .user-info
                float left
                margin-top 8px
                margin-left 15px
                p
                  font-weight: 700
                  font-size 18px
                  color #fff
                  &.user-info-top
                    padding-bottom 8px
                  .user-icon
                    display inline-block
                    width 18px
                    height 20px
                    .icon-mobile-phone
                      font-size 18px
                    //   vertical-align text-top
                  .icon-mobile-number
                    font-size 14px
                    color #fff
              .arrow
                width 12px
                height 12px
                position absolute
                right 15px
                top 40%
                .icon-arrow-right
                  color #fff
                  font-size 22px
          .profile_info_data
            bottom-border-1px(#e4e4e4)
            width 100%
            background #fff
            overflow hidden
            .info_data_list
              clearFix()
              .info_data_link
                float left
                width 33%
                text-align center
                border-right 1px solid #f1f1f1
                .info_data_top
                  display block
                  width 100%
                  font-size 14px
                  color #333
                  padding 15px 5px 10px
                  span
                    display inline-block
                    font-size 30px
                    color #f90
                    font-weight 700
                    line-height 30px
                .info_data_bottom
                  display inline-block
                  font-size 14px
                  color #666
                  font-weight 400
                  padding-bottom 10px
              .info_data_link:nth-of-type(2)
                .info_data_top
                  span
                    color #ff5f3e
              .info_data_link:nth-of-type(3)
                border 0
                .info_data_top
                  span
                    color #6ac20b
          .profile_my_order
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .my_order
              display flex
              align-items center
              padding-left 15px
              >span
                display flex
                align-items center
                width 20px
                height 20px
                >.iconfont
                  margin-left -10px
                  font-size 30px
                .icon-suggest
                  color #02a774
                .icon-extra-inquiries
                  color #ff5f3e
                .icon-brand
                  color #f90
                .icon-company
                  color #02a774
              .my_order_div
                width 100%
                border-bottom 1px solid #f1f1f1
                padding 18px 10px 18px 0
                font-size 16px
                color #333
                display flex
                justify-content space-between
                span
                  display block
                .my_order_icon
                  width 10px
                  height 10px
                  .icon-arrow-right
                    color #bbb
                    font-size 18px
</style>
