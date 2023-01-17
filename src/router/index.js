// 引入vue-router插件
import VueRouter from 'vue-router'

// 重写push和replace方法，解决编程式导航重复跳转警告问题
// 先把VueRouter原型对象上的push和replace方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;
// 重写push和replace方法
// 第一个参数：告诉原来的方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function(location, resolve, reject){
    if(resolve && reject){
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject){
    if(resolve && reject){
        originReplace.call(this, location, resolve, reject)
    }else{
        originReplace.call(this, location, ()=>{}, ()=>{})
    }
}

// 配置路由
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/pages/Home/HomeVue.vue'),
            meta: {showFooter: true, showTypeNav: true}
        },
        {
            path: '/search',
            component: () => import('@/pages/Search/SearchVue'),
            meta: {showFooter: true, showTypeNav: false}
        },
        {
            name: 'detail',
            path: '/detail/:goodId',
            component: () => import('@/pages/Detail/DetailVue.vue'),
            meta: {showFooter: true}
        },
        {
            path: '/login',
            component: () => import('@/pages/Login/LoginVue'),
            meta: {showFooter: false}
        },
        {
            path: '/register',
            component: () => import('@/pages/Register/RegisterVue'),
            meta: {showFooter: false}
        },
        {
            path: '/addcart',
            component: () => import('@/pages/AddCart/AddCartSuccess.vue'),
            meta: {showFooter: true}
        },
        {
            path: '/shopcart',
            component: () => import('@/pages/ShopCart/ShopCart.vue'),
            meta: {showFooter: true}
        },
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
      }
})