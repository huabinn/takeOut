<template>
    <div class="user_info">
        <!-- 顶部标题 -->
        <header class="top">
            <router-link class="top_left" to="/profile">
                <i class="iconfont icon-arrow-left"></i>
            </router-link>
            <span class="top_title">
                <span class="top_title_text">个人信息</span>
            </span>
        </header>
        <!-- 头像 -->
        <div class="avatar">
            <div class="avatar_left">
                <span>头像</span>
            </div>
            <div class="avatar_right">
                <div class="avatar_img">
                    <img :src="userInfo.avatar? baseUrl + userInfo.avatar : 'http://localhost:8000/public/images/avatar-default.png'" alt="">
                </div>
                <div class="avatar_icon">
                    <span class="iconfont icon-arrow-right"></span>
                </div>
            </div>
        </div>
        <!-- 其他的用户信息 -->
        <div class="user_message">
            <div class="message">
                <div class="message_left">
                    <span>昵称</span>
                </div>
                <div class="message_right">
                    <div class="message_detail">
                        <span>{{userInfo.name}}</span>
                    </div>
                    <div class="message_icon">
                        <span class="iconfont icon-arrow-right"></span>
                    </div>
                </div>
            </div>
            <div class="message">
                <div class="message_left">
                    <span>性别</span>
                </div>
                <div class="message_right">
                    <div class="message_detail">
                        <span>{{userInfo.gender? sex(userInfo.gender) : ''}}</span>
                    </div>
                    <div class="message_icon">
                        <span class="iconfont icon-arrow-right"></span>
                    </div>
                </div>
            </div>
            <div class="message">
                <div class="message_left">
                    <span>生日</span>
                </div>
                <div class="message_right">
                    <div class="message_detail">
                        <span>{{userInfo.birthday? userInfo.birthday : ''}}</span>
                    </div>
                    <div class="message_icon">
                        <span class="iconfont icon-arrow-right"></span>
                    </div>
                </div>
            </div>
            <div class="message">
                <div class="message_left">
                    <span>收货地址</span>
                </div>
                <div class="message_right">
                    <div class="message_detail">
                        <span>{{userInfo.address? userInfo.address : ''}}</span>
                    </div>
                    <div class="message_icon">
                        <span class="iconfont icon-arrow-right"></span>
                    </div>
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
        },
        methods: {
            sex (gender) {
                if (gender === 1) {
                    return '男'
                } else if (gender === 0) {
                    return '女'
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style lang='less'>
    @import "../../common/less/mixins.less";
    @ground-color: #fff;
    @left_text_color: #1a1a1a;
    @right_text_color: rgb(134,134,134);
    
    .user_info {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        // z-index: 1;
        background-color: rgb(237,237,237);
        font-size: 18px;
        .top {
            background-color: rgb(237,237,237);
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            width: 100%;
            height: 45px;
            border: none;
            .bottom-border-1px(rgb(248,248,248));
            .top_left {
                position: absolute;
                left: 15px;
                top: 50%;
                transform: translateY(-50%);
                width: 10%;
                height: 50%;
                .icon-arrow-left{
                    font-size: 25px;
                    color: @left_text_color;
                }
            }
            .top_title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50%;
                color: #fff;
                text-align: center;
                .top_title_text {
                    font-size: 18px;
                    color: @left_text_color;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                }
            }
        }

        .avatar {
            position: fixed;
            width: 100%;
            height: 85px;
            background-color: @ground-color;
            .bottom-border-1px(rgb(248,248,248); 96%);
            .avatar_left {
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                span {
                    font-size: 16px;
                }
            }
            .avatar_right {
                width: 100px;
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                .avatar_img {
                    position: absolute;
                    width: 70px;
                    height: 70px;
                    right: 28px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 8px;
                    overflow: hidden;
                    // float: left;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .avatar_icon {
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    .icon-arrow-right {
                        font-size: 24px;
                        color: @right_text_color;
                    }
                }
            }
        }

        .user_message {
            // position: fixed;
            .message {
                position: fixed;
                width: 100%;
                height: 50px;
                background-color: @ground-color;
                .bottom-border-1px(rgb(248,248,248); 96%);
                .message_left {
                    position: absolute;
                    left: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    span {
                        font-size: 16px;
                    }
                }
                .message_right {
                    width: 60%;
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: @right_text_color;
                    .message_detail {
                        position: absolute;
                        right: 28px;
                        top: 50%;
                        transform: translateY(-50%);                        
                    }
                    .message_icon {
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        .icon-arrow-right {
                            font-size: 24px;
                        }
                    }
                }
            }
        }
    }
</style>
