import {reqRegisterCode, reqRegister, reqLogin, reqUserInfo, reqExitLogin} from '@/api/api'
import {setToken} from '@/utils/token'
const state = {
    userInfo: {}
}
const getters = {
   
}
const actions= {
    // 获取注册验证码
    async getRegisterCode(_, phone){
        let result = await reqRegisterCode(phone)
        if(result.code === 200){
            return result.data
        }else{
            return Promise.reject(new Error('failer'))
        }
    },
    // 注册用户账号
    async registerUser(_, params){
        let result = await reqRegister(params)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failer'))
        }
    },
    // 用户登录，存储token
    async LoginUser(_,params){
        let result = await reqLogin(params)
        if(result.code === 200){
            // 存储token到localStorage
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('账号或密码错误'))
        }
    },
    // 根据token，获取用户信息
    async getUserInfo(context){
        let result = await reqUserInfo()
        if(result.code === 200){
            context.commit('GETUSERINFO', result.data)
        }else{
            context.commit('GETUSERINFO', {})
            return Promise.reject(new Error('用户验证失败'))
        }
    },
    // 退出登录异步请求
    async exitLogin(context){
        let result = await reqExitLogin()
        if(result.code === 200){
            context.commit('GETUSERINFO', {})
            return 'ok'
        }else{
            return Promise.reject(new Error('退出登录失败'))
        }
    }
}
const mutations = {
    GETUSERINFO(state, value){
        state.userInfo = value
    }
}

export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}