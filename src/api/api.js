// 获取二次封装的axios
// 注意：axios请求返回的是一个promise对象
import server from './server'
import mockServer from './mockServer'

// 商品分类菜单接口
const reqCategoryList = () => server({
    method: 'get',
    url: '/product/getBaseCategoryList'
})
// 首页轮播图接口（mock）
const reqBannerList = () => mockServer({
    method: 'get',
    url: '/banner'
})
// 首页列表接口（mock）
const reqFloorList = () => mockServer({
    method: 'get',
    url: '/floor'
})
// 搜索页数据接口
const reqSourchData = (params) => server({
    method: 'post',
    url: '/list',
    data: params
})
// 获取商品详细信息
const reqGoodInfo = (goodId) => server({
    method: 'get',
    url: `/item/${goodId}`
})
// 将商品信息存储到购物车接口
const reqAddUpdateShoppingCar = (skuId, skuNum) => server({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`
})
// 获取购物车中的商品接口
const reqShopCartList = () => server({
    method: 'get',
    url: '/cart/cartList'
})
// 删除购物车商品接口
const reqDeleteShoppingGood = (skuId) => server({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
})
// 切换商品选中状态接口
const reqChangeChecked = (skuID, isChecked) => server({
    method: 'get',
    url: `/cart/checkCart/${skuID}/${isChecked}`
})
// 获取注册验证码接口
const reqRegisterCode = (phone) => server({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`
})
// 用户注册账号接口
const reqRegister = ({
    phone,
    password,
    code
}) => server({
    method: 'post',
    url: `/user/passport/register`,
    data: {
        phone,
        password,
        code
    }
})
// 用户登录账号接口
const reqLogin = ({phone, password}) => server({
    method: 'post',
    url: '/user/passport/login',
    data: {
        phone,
        password
    }
})
// 根据token获取用户信息接口
const reqUserInfo = () => server({method: 'get', url: '/user/passport/auth/getUserInfo'})



// 统一向外暴露请求
export {
    reqCategoryList,
    reqBannerList,
    reqFloorList,
    reqSourchData,
    reqGoodInfo,
    reqAddUpdateShoppingCar,
    reqShopCartList,
    reqDeleteShoppingGood,
    reqChangeChecked,
    reqRegisterCode,
    reqRegister,
    reqLogin,
    reqUserInfo
}