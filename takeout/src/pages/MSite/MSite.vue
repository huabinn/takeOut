<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont icon-search"></i>
            </router-link>
            <router-link :to="userInfo._id? '/profile' : '/login'" class="header_login" slot="right">
                <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
                <span class="header_login_text" v-else>
                    <i class="iconfont icon-certified-supplier"></i>
                </span>
            </router-link>
        </HeaderTop>
        <div class="miste-content-wrapper">
            <div class="miste-content">
                <!--首页导航-->
                <nav class="msite_nav">
                <div class="swiper-container" v-if="categorys.length">
                    <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
                        <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
                        <div class="food_container">
                            <img :src="baseImageUrl+category.image_url">
                        </div>
                        <span>{{category.title}}</span>
                        </a>
                    </div>

                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>
                <img src="./images/msite_back.svg" alt="back" v-else>
                </nav>
                <!--首页附近商家-->
                <div class="msite_shop_list">
                <div class="shop_header">
                    <i class="iconfont icon-xuanxiang"></i>
                    <span class="shop_header_title">附近商家</span>
                </div>
                <ShopList/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import HeaderTop from "../../components/HeaderTop/HeaderTop"
    // 引入swiper
    import Swiper from 'swiper'
    // 加入swiper的样式文件
    import 'swiper/dist/css/swiper.min.css'
    import BScroll from 'better-scroll'
    import ShopList from '../../components/ShopList/ShopList'
    

    export default {
        data () {
            return {
                baseImageUrl: 'https://fuss10.elemecdn.com'
            }
        },

        mounted () {
            this.$store.dispatch('getFoodCategorys', () => {
                this.$nextTick(() => {
                    new BScroll('.miste-content-wrapper', {
                        // better-scroll会默认阻止点击事件，必须打开才可以点击
                        click: true
                    })
                })
            })
        },

        computed: {
            // 获取地址，食品分类数组，商家数组
            ...mapState(['address', 'userInfo', 'categorys', 'shops']),

            // 根据 categorys 一维数组生成一个二维数组
            categorysArr () {
                const {categorys} = this
                // 准备一个空的二维数组
                const arr = []
                categorys.forEach((item, index) => {
                    const num = Math.floor(index / 8)
                    if (!arr[num]) {
                        arr[num] = []
                    }
                    arr[num].push(item)
                });
                // 返回
                return arr
            },
        },

        watch: {     //增加监听，监视 categorys 的变化动态生成Swiper
            categorys (value) {
                // 一旦界面更新就立即调用
                this.$nextTick(() => {         //在修改数据之后立即使用它，然后等待dom更新(此条语句要写在数据更新之后)
                    new Swiper('.swiper-container', {
                        // loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination'
                        },
                    })
                })
            }
        },

        components: {
            HeaderTop,
            ShopList,
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
      .msite_nav
        bottom-border-1px(#e4e4e4)
        margin-top 15px
        height 200px
        background #fff
        .swiper-container
          width 100%
          height 100%
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display flex
              justify-content center
              align-items flex-start
              flex-wrap wrap
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
          .swiper-pagination
            >span.swiper-pagination-bullet-active
              background #02a774
      .msite_shop_list
        top-border-1px(#e4e4e4)
        margin-top 10px
        background #fff
        .shop_header
          padding 10px 10px 0
          .shop_icon
            margin-left 5px
            color #999
          .shop_header_title
            color #999
            font-size 14px
            line-height 20px
</style>
