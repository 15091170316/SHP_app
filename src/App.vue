<template>
  <div>
    <HeaderVue></HeaderVue>
    <router-view></router-view>
    <FooterVue v-show="$route.meta.showFooter"></FooterVue>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header/HeaderVue.vue'
import FooterVue from '@/components/Footer/FooterVue.vue'

export default {
  name: 'App',
  components: {
    HeaderVue,
    FooterVue
  },
  mounted(){
    // 在App组件中让vuex请求三级菜单导航数据，因为APP组件仅执行一次，执行后导航数据将存在于vuex中，提高代码效率
    this.$store.dispatch('home/getTypeNav')
  }
}
</script>

<style>

</style>
