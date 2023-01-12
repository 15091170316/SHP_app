import Vue from 'vue'
import Vuex from 'vuex'
// 引入拆分的模块化vuex配置
import home from './home'
import search from './search'

// 使用vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        search
    }
})