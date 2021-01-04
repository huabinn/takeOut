<template>
  <div>
    <router-view/>
    <FooterGuide v-if="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  
  export default {
    // 获取后端数据，挂载渲染组件使用mounted
    mounted () {
      // this.$store.dispatch('getAddress')
      // 获取地址
      this.getAddress()
      // 获取食品分类
      this.getFoodCategorys()
      // 获取商家店铺
      this.getShops()
      // 获取登录信息
      this.getUserInfo()
    },

    methods: {
      ...mapActions(['getAddress', 'getFoodCategorys', 'getShops', 'getUserInfo'])
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus">
</style>
