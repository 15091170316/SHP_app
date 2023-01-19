import {reqShopCartList, reqDeleteShoppingGood, reqChangeChecked} from '@/api/api'
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
    },
    // 删除购物车商品
    async deleteShoppingGood(_, cartId){
        let result = await reqDeleteShoppingGood(cartId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failer'))
        }
    },
    // 切换商品选中状态
    async changeChecked(_, {skuID, isChecked}){
        let result = await reqChangeChecked(skuID, isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failer1'))
        }
    },
    // 切换全选/全不选
    changeAllChecked(context, flag){
        let allPromise = []
        context.getters.cartInfoList.forEach(cartInfo => {
            if(cartInfo.isChecked != flag){
                let promise = context.dispatch('changeChecked', {skuID: cartInfo.skuId, isChecked: flag})
                allPromise.push(promise)
            }  
        });
        return Promise.all(allPromise)
    },
    // 删除所有选中的商品
    deleteChecked(context){
        let allPromise = []
        context.getters.cartInfoList.forEach(cartInfo => {
            if(cartInfo.isChecked){
                let promise = context.dispatch('deleteShoppingGood', cartInfo.skuId)
                allPromise.push(promise)
            }
        })
        return Promise.all(allPromise)
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
