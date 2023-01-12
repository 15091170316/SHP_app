import Vue from 'vue'
import App from './App.vue'
// 引入vue-router路由插件
import VueRouter from 'vue-router'
// 引入router配置文件
import router from '@/router'
// 使用路由插件
Vue.use(VueRouter)

// 注册全局组件
// 商品分类导航三级联动
Vue.component('TypeNav', ()=>import('@/pages/Home/TypeNav/TypeNav.vue'))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
