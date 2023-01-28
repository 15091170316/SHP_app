import {reqUserAddress, reqUserTrade} from '@/api/api'
const state = {
    userAddress: [],    //用户地址信息
    userTrade: {}       //用户订单信息
}
const getters = {}
const actions = {
    // 请求用户地址信息
    async getUserAddress(context){
        let result = await reqUserAddress()
        if(result.code === 200){
            context.commit('GETUSERADDRESS', result.data)
        }
    },
    // 请求用户订单信息
    async getUserTrade(context){
        let result = await reqUserTrade()
        if(result.code === 200){
            context.commit('GETUSERTRADE', result.data)
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, value){
        state.userAddress = value
    },
    GETUSERTRADE(state, value){
        state.userTrade = value
    }
}
export default{
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}