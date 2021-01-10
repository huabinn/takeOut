// 包含多个基于state的getter计算属性对象
export default {
    totalCount (state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
    },

    totalPrice (state) {
        return state.cartFoods.reduce((preTotal, food) => preTotal + food.count*food.price, 0)
    },
    // 获取满意的评价数量
    positiveSize (state) {
        return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType===0? 1:0), 0)
    }
}