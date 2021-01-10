// 直接更新state多个方法对象
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS,
    CLEAR_SEARCH_SHOPS
} from './mutation-types'

export default {
    // 获取地址
    [RECEIVE_ADDRESS] (state, {address}) {
        state.address = address
    },
    // 获取食品分类
    [RECEIVE_CATEGORYS] (state, {categorys}) {
        state.categorys = categorys
    },
    // 获取商店
    [RECEIVE_SHOPS] (state, {shops}) {
        state.shops = shops
    },
    // 获取用户信息
    [RECEIVE_USER_INFO] (state, {userInfo}) {
        state.userInfo = userInfo
    },
    // 退出登录，清楚用户信息
    [RESET_USER_INFO] (state) {
        state.userInfo = {}
    },
    // 获取商店的食物列表
    [RECEIVE_GOODS] (state, {goods}) {
        state.goods = goods
    },
    // 获取评价
    [RECEIVE_RATINGS] (state, {ratings}) {
        state.ratings = ratings
    },
    // 获取商店信息
    [RECEIVE_INFO] (state, {info}) {
        state.info = info
    },
    // 购物车加 1
    [INCREMENT_FOOD_COUNT] (state, {food}) {
        if (!food.count) {
            // 新增变量，使用Vue.set  (变量 变量名字 值)
            Vue.set(food, 'count', 1)
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    // 购物车减 1
    [DECREMENT_FOOD_COUNT] (state, {food}) {
        if (food.count > 1) {
            food.count --
        } else {
            food.count = null
            state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
        }
    },
    // 清空购物车
    [CLEAR_CART] (state) {
        // 清除 food 中的 count
        state.cartFoods.forEach(food => food.count = 0)
        // 移除购物车中的购物项
        state.cartFoods = []
    },
    // 搜索商家
    [RECEIVE_SEARCH_SHOPS] (state, {searchShop}) {
        state.searchShops = searchShop
    },
    // 清空搜索商家
    [CLEAR_SEARCH_SHOPS] (state) {
        state.searchShops = []
    }
}