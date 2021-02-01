<template>
    <div class="menu">
        <div class="content">
            <div class="content_top">
                <div class="content_top_left"><span>{{info.name}}</span></div>
            </div>
            <div class="content_main" v-for="food in cartFoods">
                <div class="content_main_left">
                    <div class="img">
                        <img :src="food.image" alt="">
                    </div>
                    <div class="name">
                        <span>{{food.name}}</span>
                    </div>
                    <div class="count">
                        <i>x {{food.count}}</i>
                    </div>
                </div>
                <div class="content_main_right">
                    <span><i>￥</i>{{food.price * food.count}}</span>
                </div>
            </div>
            <div class="content_middle">
                <div class="content_middle_left">
                    <span>配送费(商家配送)</span>
                </div>
                <div class="content_middle_right">
                    <span>
                        <i>￥</i>{{info.deliveryPrice}}
                    </span>
                </div>
            </div>
            <div class="content_bottom">
                <div class="content_bottom_left">
                    <span>优惠说明</span>
                    <i class="iconfont icon-help"></i>
                </div>
                <div class="content_bottom_right">
                    <span>小计:￥</span>
                    <i>{{totalPrice}}</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters} from 'vuex'
    
    export default {
        computed: {
            ...mapState(['info', 'cartFoods']),
            ...mapGetters(['totalPrice'])
        }
    }
</script>

<style lang="less">
    @import "../../common/less/mixins.less";
    .menu {
        display: flex;
        justify-content: center;
        .content {
            position: relative;
            width: 92%;
            background-color: #fff;
            border-radius: 8px;
            margin-top: 10px;
            font-size: 14px;
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
                    font-size: 14px;
                    color: rgb(150,150,150);
                }
                .content_top_right {
                    right: 10px;
                    color: #cacaca;
                }
                .on {
                    font-weight: 600;
                }
            }
            .content_main {
                position: relative;
                width: 100%;
                height: 70px;
                .content_main_left, .content_main_right {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .content_main_left {
                    left: 10px;
                    .img {
                        float: left;
                        width: 55px;
                        height: 55px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name {
                        width: 150px;
                        position: absolute;
                        top: 5px;
                        left: 65px;
                        // font-size: 12px;
                        font-weight: 600;
                        text-overflow: ellipsis;
                    }
                    .count {
                        width: 150px;
                        position: absolute;
                        bottom: 8px;
                        left: 65px;
                        font-size: 12px;
                        text-overflow: ellipsis;
                    }
                }
                .content_main_right {
                    right: 10px;
                    span {
                        font-weight: 600;
                        font-size: 16px;
                        i {
                            font-weight: 500;
                            font-size: 10px;
                        }
                    }
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
                        color: #333;
                    }
                }
                .content_middle_right {
                    right: 10px;
                    
                    span {
                        font-weight: 600;                 
                        font-size: 16px;
                        i {
                            font-size: 12px;
                        }
                    }
                }
            }
            .content_bottom {
                .top-border-1px(#f5f5f5; 97%);
                position: relative;
                width: 100%;
                height: 70px;
                .content_bottom_left, .content_bottom_right {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .content_bottom_left {
                    left: 10px;
                    color: rgb(153, 153, 153);
                    span {
                        margin-right: 8px;
                    }
                }
                .content_bottom_right {
                    right: 10px;
                    i {
                        font-size: 24px;
                        font-weight: 600;
                    }
                }
            }
        }
    }
</style>
