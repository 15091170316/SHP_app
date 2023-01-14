// 引入api接口文件
import {
    reqCategoryList,
    reqBannerList,
    reqFloorList
} from '@/api/api'
const state = {
    typeNavData: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    // 存储三级联动导航数据
    GETTYPENAV(state, value) {
        state.typeNavData = value
    },
    // 存储首页轮播图数据
    GETBANNERLIST(state, value) {
        state.bannerList = value
    },
    // 存储首页商品列表数据（mock）
    GETFLOORLIST(state, value) {
        state.floorList = value
    }
}
const actions = {
    // 获取三级联动导航数据
    async getTypeNav(context) {
        const result = await reqCategoryList()
        if (result.code === 200) {
            context.commit('GETTYPENAV', result.data)
        }
    },
    // 获取首页轮播图数据(mock)
    async getBannerList(context) {
        const result = await reqBannerList()
        if (result.code === 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },
    // 获取首页商品列表数据（mock）
    async getFloorList(context) {
        const result = await reqFloorList()
        if (result.code === 200) {
            context.commit('GETFLOORLIST', result.data)
        }
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