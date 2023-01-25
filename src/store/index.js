import Vue from 'vue'
import Vuex from 'vuex'
// 引入拆分的模块化vuex配置
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'

// 使用vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user
    }
})