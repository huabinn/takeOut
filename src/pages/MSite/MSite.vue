<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <span class="header_search" slot="left">
                <i class="iconfont icon-search"></i>
            </span>
            <router-link to="/login" class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </router-link>
            <!-- <span class="header_login" slot="right">
                <span class="header_login_text">登录|注册</span>
            </span> -->
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container" v-if="categorys.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="categorys in categorysArr">
                        <a href="javascript:" class="link_to_food" v-for="category in categorys">
                            <div class="food_container">
                                <img :src="baseImageUrl + category.image_url">
                            </div>
                            <span>{{category.title}}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
            <!-- 显示请求失败的图片 -->
            <img src="./images/msite_back.svg" alt="" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList/>
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
    import ShopList from '../../components/ShopList/ShopList'
    

    export default {
        data () {
            return {
                baseImageUrl: 'https://fuss10.elemecdn.com'
            }
        },

        mounted () {
            this.$store.dispatch('getFoodCategorys')
                        
        },

        computed: {
            // 获取地址，食品分类数组，商家数组
            ...mapState(['address', 'categorys']),

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
        .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
                position absolute
                left 15px
                top 45%
                transform translateY(-50%)
                width 10%
                height 50%
                .icon-search
                    font-size 25px
                    color #fff
            .header_title
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
                width 50%
                color #fff
                text-align center
                .header_title_text
                    font-size 18px
                    color #fff
                    display block
            .header_login
                font-size 14px
                color #fff
                position absolute
                right 15px
                top 50%
                transform translateY(-50%)
                .header_login_text
                    color #fff
        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
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
