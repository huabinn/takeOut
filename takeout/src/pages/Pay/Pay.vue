<template>
    <div class="pay">
        <div class="user_info">
            <div class="message">
                <div class="img">
                    <img :src="baseUrl + userInfo.avatar" alt="">
                </div>
                <div class="user_name">
                    <!-- <span>18402079799</span> -->
                    <span>{{userInfo.phone? userInfo.phone : ''}}</span>
                </div>
            </div>
        </div>
        <div class="pay_text">
            <div class="pay_top">
                <div class="close" @click="$router.push('/order')">
                    <i class="iconfont icon-close"></i>
                </div>
                <div class="code">
                    <span>使用密码</span>
                </div>
            </div>
            <div class="price">
                <div>
                    <i>￥</i><span class="num">24.80</span>
                </div>
            </div>
            <div class="pay_way">
                <div class="pay_way_left">
                    <span>付款方式</span>
                </div>
                <div class="pay_way_right">
                    <span>支付宝</span>
                    <span class="iconfont icon-arrow-right"></span>
                </div>
            </div>
            <div class="bottom">
                <div class="pay_now">
                    <mt-button @click="$router.push('/order')">立即付款</mt-button>
                </div>
                <div class="way_message">
                    <span>支付就用支付宝</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                baseUrl: 'http://localhost:8000'
            }
        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="less">
    @import "../../common/less/mixins.less";
    .pay {
        position: fixed;
        width: 100%;
        height: 100%;
        font-size: 16px;
        background-color: rgb(50,62,85);
        color: rgb(147,147,145);
        .user_info {
            width: 100%;
            height: 33%;
            display: flex;
            justify-content: center;
            .message {
                height: 105px;
                display: flex;
                justify-content: center;
                position: absolute;
                top: 8%;
                .img {
                    position: absolute;
                    top: 0;
                    width: 80px;
                    height: 80px;
                    border-radius: 5px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .user_name {
                    position: absolute;
                    bottom: 0;
                }
            }            
        }

        .pay_text {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 66%;
            background-color: #fff;
            .pay_top {
                position: relative;
                width: 100%;
                height: 40px;
                text-align: center;
                .close {
                    position: absolute;
                    left: 4%;
                    top: 50%;
                    transform: translateY(-50%);
                    .icon-close {
                        font-size: 26px;
                    }
                }
                .code {
                    position: absolute;
                    right: 4%;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .price {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100px;
                font-size: 24px;
                color: #000;
                font-weight: 600;
                .num {
                    font-size: 48px;
                }
            }
            .pay_way {
                position: relative;
                width: 100%;
                height: 45px;
                text-align: center;
                .top-border-1px(rgb(241,241,241));
                .bottom-border-1px(rgb(241,241,241); 96%);
                .pay_way_left {
                    position: absolute;
                    left: 4%;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .pay_way_right {
                    position: absolute;
                    right: 4%;
                    top: 50%;
                    transform: translateY(-50%);
                    span {
                        color: #000;
                    }
                    .icon-arrow-right {
                        font-size: 22px;
                    }
                }
            }
            
            .bottom {
                position: absolute;
                left: 0;
                bottom: 10px;
                width: 100%;
                .pay_now {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 10px;
                    button {
                        width: 92%;
                        height: 50px;
                        color: rgb(228,254,245);
                        background-color: rgb(22,117,255);
                    }
                }
                .way_message {
                    text-align: center;
                    font-weight: 600;
                    color: rgb(200,200,200);
                }
            }
        }
    }
</style>
