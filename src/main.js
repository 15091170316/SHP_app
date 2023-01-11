import Vue from 'vue'
import App from './App.vue'
// 引入vue-router路由插件
import VueRouter from 'vue-router'
// 引入router配置文件
import router from '@/router'
// 使用路由插件
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
