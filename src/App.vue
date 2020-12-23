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
      this.getAddress()
      this.getFoodCategorys()
      this.getShops()
    },

    methods: {
      ...mapActions(['getAddress', 'getFoodCategorys', 'getShops'])
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus">
</style>
