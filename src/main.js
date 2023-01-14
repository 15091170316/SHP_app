import Vue from 'vue'
import App from './App.vue'
// 引入vue-router路由插件
import VueRouter from 'vue-router'
// 引入router配置文件
import router from '@/router'
// 引入vuex配置文件
import store from '@/store/index'
// 引入mock模拟数据（使其执行一遍就行，不需要暴露）
import '@/mock/mockServer'
// 全局引入swiper轮播图库的CSS文件
import 'swiper/css/swiper.min.css'
// 使用路由插件
Vue.use(VueRouter)

// 注册全局组件
// 商品分类导航三级联动
Vue.component('TypeNav', ()=>import('@/pages/Home/TypeNav/TypeNav.vue'))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
