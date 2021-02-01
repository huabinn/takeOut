<template>
    <div class="payment">
        <HeaderTop title="确认订单">
            <span class="header_search" slot="left">
                <i class="iconfont icon-arrow-left" @click="$router.back()"></i>
            </span>
        </HeaderTop>
        <div class="payment_content">
            <div class="scroll">
                <div class="cover ground">
                    <div class="content">
                        <!-- <div class="content_top">
                            <div class="content_top_left"><span>外卖配送</span></div>
                            <div class="content_top_right"><span>到店自取</span></div>                    
                        </div> -->
                        <div class="content_middle">
                            <div class="content_middle_left">
                                <span>{{userInfo.address? userInfo.address : '请选择收货地址'}}</span>
                            </div>
                            <div class="content_middle_right">
                                <i class="iconfont icon-arrow-right"></i>
                            </div>
                        </div>
                        <div class="content_bottom">
                            <div class="content_bottom_left">
                                <span>立即送出</span>
                            </div>
                            <div class="content_bottom_right">
                                <span>大约{{info.deliveryTime}}送到</span>
                                <i class="iconfont icon-arrow-right"></i>
                            </div>
                        </div>
                        <div class="content_bottom">
                            <div class="content_bottom_left">
                                <span>支付方式</span>
                            </div>
                            <div class="content_bottom_right">
                                <span>支付宝</span>
                                <i class="iconfont icon-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu></Menu>
            </div>
            <div class="cover">
                <div class="commit">
                    <div class="right">
                        <span class="common">合计：</span>
                        <i class="on">￥</i>
                        <span class="on stress">{{totalPrice}}</span>
                        <mt-button @click="submit">提交订单</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop/HeaderTop"
    import Menu from "../../components/Menu/Menu"
    import { mapGetters, mapState } from 'vuex'
    export default {
        computed: {
            ...mapState(['info', 'userInfo', 'cartFoods']),
            ...mapGetters(['totalPrice'])
        },
        methods: {
            submit () {
                
                this.$router.push({path: '/pay', query: {lump_sum: this.totalPrice}})
                // this.$store.dispatch('clearCart')
            }
        },
        components: {
            HeaderTop,
            Menu
        }
    }
</script>

<style lang="less">
    @import "../../common/less/mixins.less";
    .payment {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #f5f5f5;
        .top {
            position: fixed;
            width: 100%;
            height: 45px;
        }
        .payment_content {
            position: fixed;
            top: 45px;
            left: 0;
            width: 100%;
            .ground {
                width: 100%;
                height: 100%;
                background-image: linear-gradient(rgba(98,99,101,0.8), #f5f5f5 70%);
            }
            .cover {
                display: flex;
                justify-content: center;
                // left: 4%;
                .content {
                    position: relative;
                    width: 92%;
                    background-color: #fff;
                    border-radius: 8px;
                    margin-top: 10px;
                    font-size: 14px;
                    // color: #000;
                    .content_top {
                        position: relative;
                        width: 100%;
                        height: 40px;
                        .content_top_left, .content_top_right {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        .content_top_left {
                            left: 10px;
                            font-size: 16px;
                            font-weight: 500;
                        }
                        .content_top_right {
                            right: 10px;
                            color: #cacaca;
                        }
                        .on {
                            font-weight: 600;
                        }
                    }
                    .content_middle {
                        position: relative;
                        width: 100%;
                        height: 50px;
                        .content_middle_left, .content_middle_right {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        .content_middle_left {
                            left: 10px;
                            span {
                                font-size: 20px;
                                font-weight: 500;
                            }
                        }
                        .content_middle_right {
                            right: 10px;
                            
                            span {
                                margin-right: 5px;                                
                            }
                            .icon-arrow-right {
                                font-size: 18px;
                                color: #cacaca;
                            }
                        }
                    }
                    .content_bottom {
                        position: relative;
                        width: 100%;
                        height: 40px;
                        .content_bottom_left, .content_bottom_right {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        .content_bottom_left {
                            left: 10px;
                        }
                        .content_bottom_right {
                            right: 10px;
                            
                            span {
                                margin-right: 5px;
                                margin-bottom: 5px;
                            }
                            .icon-arrow-right {
                                font-size: 18px;
                                color: #cacaca;
                            }
                        }
                    }
                }
                .commit {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 60px;
                    background-color: #fff;
                    .right {
                        position: absolute;
                        right: 10px;
                        bottom: 10px;
                        font-size: 14px;
                        .on {
                            color: red;
                        }
                        .stress {
                            font-size: 24px;
                            font-weight: 600;
                        }
                        button {
                            // position: absolute;
                            // bottom: 5px;
                            width: 110px;
                            height: 40px;
                            color: #fff;
                            font-size: 18px;
                            margin-left: 15px;
                            border: none;
                            border-radius: 20px;
                            outline: none;
                            background-color: rgba(98,99,101,0.8);        
                        }
                    }
                }
            }
        }
    }
</style>
