// 通过mutation间接更新state的多个方法对象
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
import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods,
    reqSearchShop
} from '../api'

export default {
    // 异步获取地址
    async getAddress ({commit, state}) {
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, {address})
        }
    },

    // 异步获取食品分类列表
    async getFoodCategorys ({commit}, callback) {
        // 发送异步ajax请求
        const result = await reqFoodCategorys()
        // 提交一个mutation
        if (result.code === 0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS, {categorys})
            callback && callback()
        }
    },

    // 异步获取商家列表
    async getShops ({commit, state}) {
        // 发送异步ajax请求
        const {longitude, latitude} = state
        const result = await reqShops(longitude, latitude)
        // 提交一个mutation
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    },

    // 同步记录用户信息
    recordUser ({commit}, userInfo) {
        // 提交mutation
        commit(RECEIVE_USER_INFO, {userInfo})
    },

     // 异步获取用户信息
     async getUserInfo ({commit}) {
        // 发送异步ajax请求
        const result = await reqUserInfo()
        // 提交一个mutation
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USER_INFO, {userInfo})
        }
    },

    // 异步登出
    async logout ({commit}) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }        
    },

    // 异步获取商家商品列表
    async getShopGoods({commit}, {id, callback}) {
        const result = await reqShopGoods({id: id})
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, {goods})
            // 数据更新了, 通知一下组件
            callback && callback()
        }
    },
    
    // 异步获取商家评价列表
    async getShopRatings({commit}, callback) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, {ratings})
            // callback是个可执行函数
            // 数据更新了, 通知一下组件
            callback && callback()
        }
    },

    // 异步获取商家信息
    async getShopInfo({commit}, id) {
        const result = await reqShopInfo(id)
        if (result.code === 0) {
            const info = result.data
            commit(RECEIVE_INFO, {info})
        }
    },

    // 同步更新 food 的 count 
    updateFoodCount ({commit}, {isAdd, food}) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, {food})
        } else {
            commit(DECREMENT_FOOD_COUNT, {food})
        }
    },

    // 同步清空购物车
    clearCart ({commit}) {
        commit(CLEAR_CART)
    },

    // 异步搜索商家
    async searchShops({commit, state}, keyword) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShop(geohash, keyword)
        if (result.code === 0) {
            const searchShop = result.data
            commit(RECEIVE_SEARCH_SHOPS, {searchShop})
        }
    },

    // 清空搜索商家
    clearSearchShops({commit, state}) {
        commit(CLEAR_SEARCH_SHOPS)
    },
}