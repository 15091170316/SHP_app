import {reqSourchData} from '@/api/api'

const state = {
    searchData: {}  //搜索页面数据
}
const mutations = {
    GETSEARCHDATA(state, value){
        state.searchData = value
    }
}
const actions = {
    async getSearchData(context, params={}){
        const result = await reqSourchData(params)
        if(result.code === 200){
            context.commit('GETSEARCHDATA', result.data)
        }
    }
}
const getters = {
    attrsList(state){
        return state.searchData.attrsList || []
    },
    goodsList(state){
        return state.searchData.goodsList || []
    },
    trademarkList(state){
        return state.searchData.trademarkList || []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}