// 对于axios进行二次封装
import axios from 'axios'

// 1、利用axios对象的create方法，去创建一个axios实例
// 2、server就是案凶手，只不过稍微配置一下
const server = axios.create({
    // 基础路径，发送请求的时候，路径中就会自动加上/api
    baseURL: '/api',
    // 配置请求超时的时间
    timeout: 5000
})
// 请求拦截器：在发送请求之前，请求拦截器可以监测到，可以在请求发送之前处理一些事情
server.interceptors.request.use(config => {
    // config：配置对象，对象里面的headers请求头属性很重要
    return config
})
// 响应拦截器
server.interceptors.response.use(res => {
    // 成功的回调函数：服务器响应数据后，响应拦截器可以检测到，可以处理一些业务
    return res.data;
}, error => {
    // 响应失败的回调函数
    return Promise.reject(new Error(error.message))
})

// 导出配置后的axios
export default server