import {reqShopCartList} from '@/api/api'
const state = {
    shopCartList: []
}
const actions = {
    // 获取购物车商品数据
    async getShopCart(context){
        let result = await reqShopCartList()
        if(result.code === 200){
            context.commit('GETSHOPCART', result.data)
        }
    }
}
const mutations = {
    GETSHOPCART(state, value){
        state.shopCartList = value
    }
}
const getters = {
    cartInfoList(state){
        let gan = state.shopCartList[0] || {}
        return gan.cartInfoList || []
    }
}
export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
