// 引入api接口文件
import {reqCategoryList} from '@/api/api'
const state = {
    typeNavData: []
}
const mutations = {
    GETTYPENAV(state, value){
        state.typeNavData = value
    }
}
const actions = {
    async getTypeNav(context){
        // 异步请求三级联动导航数据
        const value = await reqCategoryList()
        context.commit('GETTYPENAV', value.data)
    }
}
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}