<template>
    <div>
        <div class="goods">
            <!-- 菜单分类 -->
            <div class="menu-wrapper">
                <ul>
                    <!--current-->
                    <li class="menu-item" v-for="(good, index) in goods" :key="index"
                        :class="{current: index===currentIndex}" @click="menuItem(index)">
                        <span class="text bottom-border-1px">
                            <img class="icon" :src="good.icon" v-if="good.icon">
                            {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
                <!-- 食物 -->
            <div class="foods-wrapper">
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                                :key="index" @click="showFood(food)">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControl :food="food"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ShopCart/>
        </div>
        <transition name="fade">
            <Food :food="food" ref="food"/>
        </transition>
    </div>
</template>

<script>
    // 引入滑动的库
    import CartControl from '../../../components/CartControl/CartControl'
    import Food from '../../../components/Food/Food'
    import ShopCart from '../../../components/ShopCart/ShopCart'
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    export default {
        data () {
            return {
                scrollY: 0,         //右侧滑动Y轴坐标
                tops:[],            //所有右侧分类的数组
                food: {}
            }
        },
        mounted () {
            this.$store.dispatch('getShopGoods', () => {
                this.$nextTick(() => {
                    // 列表显示之后创建
                    this._initScroll()
                    this._initTops()
                })
            })
        },
        
        computed: {
            ...mapState(['goods']),
            // 计算当前分类的下标
            currentIndex () {         //初始和相关数据发生变化时执行
                const {scrollY, tops} = this
                // 根据计算条件产生一个结果
                const index = tops.findIndex((top, index) => {
                     return scrollY >= top && scrollY < tops[index + 1]
                })
                return index
            }
        },

        methods: {
            // 初始化滚动条函数
            _initScroll () {
                // 根据类名找到滚动位置
                new BScroll('.menu-wrapper', {
                    // better-scroll会默认阻止点击事件，必须打开才可以点击
                    click: true
                })
                this.foodScroll = new BScroll('.foods-wrapper', {
                    probeType: 2,      //触发相对比较快会有一点点延迟显示，但是惯性滑动不会显示
                    click: true
                })
                // 给右侧的食品列表绑定scroll监听
                this.foodScroll.on('scroll', ({x, y}) => {
                    // console.log(x, y)
                    this.scrollY = Math.abs(y)
                })
                // 给右侧的食品列表绑定scroll结束监听
                this.foodScroll.on('scrollEnd', ({x, y}) => {
                    // console.log(x, y)
                    this.scrollY = Math.abs(y)
                })
            },
            // 初始化位置
            _initTops () {
                const tops = []
                let top = 0
                tops.push(top)
                // 获取标签的位置
                const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
                Array.prototype.slice.call(lis).forEach(li => {
                    top += li.clientHeight
                    tops.push(top)
                })
                // 更新数据
                this.tops = tops
            },

            menuItem (index) {
                const scrollY = this.tops[index]
                // 让点击菜单按钮的样式立刻变白
                this.scrollY = scrollY
                this.foodScroll.scrollTo(0, -scrollY, 300)
            },

            showFood (food) {
                // 设置 food
                this.food = food
                // 显示 food
                this.$refs.food.toggleShow()
            }
        },

        components: {
            CartControl,     //加减号组件
            Food,            //食品大图组件
            ShopCart
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 205px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
//   &.fade-enter-active,&.fade-leave-active
//     transition opacity .5s
//   &.fade-enter,&.fade-leave-to
//     opacity 0
</style>
