<template>
    <section class="order">
        <HeaderTop title="订单列表">
        </HeaderTop>
        <section class="order_no_login" v-if="!userInfo._id">
            <img src="./images/person.png">
            <h3>登录后查看外卖订单</h3>
            <button @click="$router.replace('/login')">立即登陆</button>
        </section>
        <div class="order_login" v-else>
            <div class="indent">
                <div class="indent_left">
                    <div class="img">
                        <img src="./images/2.jpg" alt="">
                    </div>
                </div>
                <div class="indent_middle">
                    <div class="indent_middle_top">
                        <div class="shop_name">
                            <span>蜜雪冰城</span>
                            <i class="iconfont icon-arrow-right"></i>
                        </div>
                        <div class="shop_status">
                            <span class="on">营业中</span>
                        </div>
                    </div>
                    <div class="indent_middle_bottom">
                        <div class="scroll">
                            <div class="cargo">
                                <div class="img">
                                    <img src="./images/2.jpg" alt="">
                                </div>
                                <span>满杯百香果</span>
                            </div>
                            <div class="cargo">
                                <div class="img">
                                    <img src="./images/2.jpg" alt="">
                                </div>
                                <span>满杯百香果</span>
                            </div>
                            <div class="cargo">
                                <div class="img">
                                    <img src="./images/2.jpg" alt="">
                                </div>
                                <span>满杯百香果</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indent_right">
                    <div class="indent_right_top">
                        <span>已送达</span>
                    </div>
                    <div class="indent_right_bottom">
                        <div class="price">
                            <i>￥</i><span>7</span>
                        </div>
                        <div class="count">
                            <span>共2件</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="indent">
                <div class="indent_left">
                    <div class="img">
                        <img src="./images/2.jpg" alt="">
                    </div>
                </div>
                <div class="indent_middle">
                    <div class="indent_middle_top">
                        <div class="shop_name">
                            <span>蜜雪冰城</span>
                            <i class="iconfont icon-arrow-right"></i>
                        </div>
                        <div class="shop_status">
                            <span class="on">营业中</span>
                        </div>
                    </div>
                    <div class="indent_middle_bottom">
                        <div class="scroll">
                            <div class="cargo">
                                <div class="img">
                                    <img src="./images/2.jpg" alt="">
                                </div>
                                <span>满杯百香果</span>
                            </div>
                            <div class="cargo">
                                <div class="img">
                                    <img src="./images/2.jpg" alt="">
                                </div>
                                <span>满杯百香果</span>
                            </div>
                            <div class="cargo">
                                <div class="img">
                                    <img src="./images/2.jpg" alt="">
                                </div>
                                <span>满杯百香果</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="indent_right">
                    <div class="indent_right_top">
                        <span>已送达</span>
                    </div>
                    <div class="indent_right_bottom">
                        <div class="price">
                            <i>￥</i><span>7</span>
                        </div>
                        <div class="count">
                            <span>共2件</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex'
    import HeaderTop from "../../components/HeaderTop/HeaderTop"
    export default {
        computed: {
            ...mapState(['userInfo'])  
        },
        components: {
            HeaderTop
        }
    }
</script>

<style lang='less'>
    @import "../../common/less/mixins.less";
    .order {
        width: 100%;           
        .order_no_login {
            padding-top: 140px;
            width: 60%;
            margin: 0 auto;
            text-align: center;
            >img {
                display: block;
                width: 100%;
                height: 30%;
            }            
            >h3 {
                padding: 10px 0;
                font-size: 17px;
                color: #6a6a6a;
            }            
            >button {
                display: inline-block;
                background: #02a774;
                font-size: 14px;
                color: #fff;
                border: 0;
                outline: none;
                border-radius: 5px;
                padding: 10px 20px;
            }
        }    
        .order_login {
            font-size: 14px;
            position: fixed;
            top: 46px;
            width: 100%;
            height: 100%;
            background-color: rgb(247,247,247);
            .indent {
                position: relative;
                left: 3%;
                width: 94%;
                height: 160px;
                border-radius: 10px;
                background-color: #fff;
                margin-top: 8px;
                .indent_left {
                    box-sizing: border-box;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 20%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    .img {
                        width: 50px;                        
                        height: 50px;
                        position: absolute;
                        // left: 10px;
                        top: 10px;
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                    }
                }
                .indent_middle {
                    box-sizing: border-box;
                    position: absolute;
                    left: 20%;
                    top: 0;
                    width: 60%;
                    height: 100%;
                    .indent_middle_top {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        .shop_name {
                            font-weight: 600;
                            >i {
                                margin-left: 5px;
                                color: rgb(127,127,127);
                            }
                        }
                        .shop_status {
                            position: relative;
                            top: 10px;
                            color: #fff;
                            font-size: 12px;
                            .on {
                                padding: 0 5px;
                                border-radius: 3px;
                                background-color: rgb(65,204,155);
                            }
                        }
                    }
                    .indent_middle_bottom {
                        position: absolute;
                        left: 10px;
                        bottom: 10px;
                        width: 100%;
                        overflow: hidden;
                        .scroll {
                            width: 1000px;
                            .cargo {
                                float: left;
                                margin-right: 10px;
                                .img {
                                    width: 70px;
                                    height: 70px;
                                    border-radius: 5px;
                                    overflow: hidden;
                                    >img {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                >span {
                                    margin-top: 8px;
                                    font-size: 12px;
                                    display: block;
                                }
                            }
                        }
                    }
                }
                .indent_right {
                    box-sizing: border-box;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 20%;
                    height: 100%;
                    color: rgb(153,153,153);
                    .indent_right_top {
                        position: absolute;
                        right: 10px;
                        top: 10px;                        
                    }
                    .indent_right_bottom {
                        width: 80%;
                        height: 40px;
                        position: absolute;
                        right: 10px;
                        bottom: 50px;
                        .price {
                            position: absolute;
                            right: 0;
                            top: 0;
                            color: #000;
                            >span {
                                font-size: 18px;
                                // font-weight: 600;
                            }
                        }
                        .count {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                        }
                    }
                }
            }
        } 
    }  
</style>
