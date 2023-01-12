// 获取二次封装的axios
// 注意：axios请求返回的是一个promise对象
import server from './server'

// 商品分类菜单接口
const reqCategoryList = () => server({method:'get', url:'/product/getBaseCategoryList'})

// 统一向外暴露请求
export {
    reqCategoryList
}