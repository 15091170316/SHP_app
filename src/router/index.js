// 引入vue-router插件
import VueRouter from 'vue-router'
import {
    getToken
} from '@/utils/token';
import store from '@/store/index'

// 重写push和replace方法，解决编程式导航重复跳转警告问题
// 先把VueRouter原型对象上的push和replace方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;
// 重写push和replace方法
// 第一个参数：告诉原来的方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/pages/Home/HomeVue.vue'),
            meta: {
                showFooter: true,
                showTypeNav: true,
                isAuth: false
            }
        },
        {
            path: '/search',
            component: () => import('@/pages/Search/SearchVue'),
            meta: {
                showFooter: true,
                showTypeNav: false,
                isAuth: false
            }
        },
        {
            name: 'detail',
            path: '/detail/:goodId',
            component: () => import('@/pages/Detail/DetailVue.vue'),
            meta: {
                showFooter: true,
                isAuth: false
            }
        },
        {
            path: '/login',
            component: () => import('@/pages/Login/LoginVue'),
            meta: {
                showFooter: false
            }
        },
        {
            path: '/register',
            component: () => import('@/pages/Register/RegisterVue'),
            meta: {
                showFooter: false
            }
        },
        {
            path: '/addcart',
            component: () => import('@/pages/AddCart/AddCartSuccess.vue'),
            meta: {
                showFooter: true,
                isAuth: false
            }
        },
        {
            path: '/shopcart',
            component: () => import('@/pages/ShopCart/ShopCart.vue'),
            meta: {
                showFooter: true,
                isAuth: false
            }
        },
        {
            path: '/trade',
            component: () => import('@/pages/Trade/TradeVue.vue'),
            meta: {
                showFooter: true,
                isAuth: true
            },
            beforeEnter(to, from, next){
                if(from.path === '/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/pay',
            component: () => import('@/pages/Pay/PayVue'),
            meta:{
                showFooter: true,
                isAuth: true
            },
            beforeEnter(to, from, next){
                if(from.path === '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess/PaySuccess.vue'),
            meta:{
                showFooter: true,
                isAuth: true
            },
            beforeEnter(to, from, next){
                if(from.path === '/pay'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/center',
            component: () => import('@/pages/Center/CenterVue.vue'),
            meta:{
                showFooter: true,
                isAuth: true
            },
            redirect: '/center/myorder',
            children: [
                {
                    path: 'myorder',
                    component: () => import('@/pages/Center/children/MyOrder.vue'),
                    meta: {
                        isAuth: true
                    }
                },
                {
                    path: 'grouporder',
                    component: () => import('@/pages/Center/children/GroupOrder.vue'),
                    meta: {
                        isAuth: true
                    }
                }
            ]
        }
    ],
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
})

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
    let userInfo = store.state.user.userInfo //获取用户信息
    // 判断是否有用户信息，没有的话就先请求一次用户信息
    if (getToken()) {
        // 有token，没用户信息时：请求用户信息存到vuex中
        if (!userInfo.phoneNum) {
            try {
                await store.dispatch('user/getUserInfo')
                userInfo = store.state.user.userInfo //更新用户信息
            } catch (error) {
                console.log(error.message);
            }
        }
    } else {
        // 没token，有用户信息时：清除vuex中的用户信息
        if (userInfo.phoneNum) {
            store.commit('user/GETUSERINFO', {})
        }
    }

    if (userInfo.phoneNum) { //已登录，且有用户数据
        //若要进入登录注册页面，需拦截
        if (to.path === '/login' || to.path === '/register') {
            next(from.path)
        }
        // 进入其他页面放行
        next()
    } else { //未登录，无用户信息
        let toPath = to.path    //想要去的路由
        if(to.meta.isAuth){   //需要登录权限的路由不能放行
            next('/login?topath='+toPath)   //通过query参数传递想要去的路由，登录成功后获取路由地址直接跳转要去的路由
        }else{
            next()
        }
    }


})

export default router