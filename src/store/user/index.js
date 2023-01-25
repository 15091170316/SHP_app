import {reqRegisterCode, reqRegister, reqLogin, reqUserInfo} from '@/api/api'
const state = {}
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
            localStorage.setItem('token', result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('账号或密码错误'))
        }
    },
    // 根据token，获取用户信息
    async getUserInfo(){
        let result = await reqUserInfo()
        if(result.code === 200){
            return result.data
        }else{
            return Promise.reject(new Error('用户验证失败'))
        }
    }
}
const mutations = {}
const getters = {}

export default{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}