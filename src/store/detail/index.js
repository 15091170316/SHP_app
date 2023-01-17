import {reqGoodInfo, reqAddUpdateShoppingCar} from '@/api/api'
const state = {
    goodInfo: {}
}
const actions = {
    // 获取商品详细信息
    async getGoodInfo(context, goodId){
        const result = await reqGoodInfo(goodId)
        if(result.code === 200){
            context.commit('GETGOODINFO', result.data)
        }
    },
    // 添加到购物车(或对已有物品进行数量的改动)
    async addUpdateShoppingCar(_, {skuId,skuNum}){
        let result = await reqAddUpdateShoppingCar(skuId, skuNum)
        // async 的函数返回的是promise对象
        if(result.code === 200){
            return 'ok'     //商品信息存储成功
        }else{
            return Promise.reject(new Error('failure')) //商品信息存储失败
        }
    }

}
const mutations = {
    GETGOODINFO(state, value){
        state.goodInfo = value
    }
}
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    },
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}