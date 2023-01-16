<template>
    <div>
        <TypeNav></TypeNav>
        <div class="main">
            <div class="py-container">
                <!--bread面包屑-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 三级菜单的面包屑 -->
                        <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                                @click="removeCategoryName">×</i></li>
                        <!-- 关键字的面包屑 -->
                        <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i
                                @click="removeKeyword">×</i></li>
                        <!-- 品牌信息的面包屑 -->
                        <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                                @click="removeTrademark">×</i></li>
                        <!-- 商品属性的面包屑 -->
                        <li class="with-x" v-for="prop, index of searchParams.props" :key="index">
                            {{ prop.split(':')[1] }}<i @click="removeProps(prop.split(':')[0])">×</i></li>
                    </ul>
                </div>

                <!--selector-->
                <SearchSelector @getBrand="getBrand" @getProps="getProps" />

                <!--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{active:isCom}">
                                    <a @click="orderHandler(1)">综合 <span v-show="isCom">{{ arrowDirection }}</span></a>
                                </li>
                                <li :class="{active:!isCom}">
                                    <a @click="orderHandler(2)">价格 <span v-show="!isCom">{{ arrowDirection }}</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="good of goodsList" :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ </em>
                                            <i>{{ good.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                            class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- 分页系统 -->
                    <PaginationVue v-if="searchData.total!==0" @curPageNo="curPageNo" :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="searchData.total" :continues="5"></PaginationVue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TypeNav from '@/pages/Home/TypeNav/TypeNav.vue'
import SearchSelector from './SearchSelector/SearchSelector'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'SearchVue',
    components: {
        TypeNav,
        SearchSelector
    },
    data() {
        return {
            searchParams: {
                category1Id: "",    //第一级菜单id
                category2Id: "",    //第二级菜单id
                category3Id: "",    //第三级菜单id
                categoryName: "",   //三级菜单名字
                keyword: "",        //搜索关键字
                order: "1:desc",    //排序方式
                pageNo: 1,          //当前页码
                pageSize: 10,       //每页展示的数量
                props: [],          //商品属性
                trademark: ""       //商品品牌
            }
        }
    },
    computed: {
        ...mapGetters('search', ['goodsList']),
        ...mapState('search', ['searchData']),
        // 是否综合排序
        isCom(){
            return this.searchParams.order.includes('1')
        },
        // 排序箭头（上下）
        arrowDirection(){
            return this.searchParams.order.includes('desc') ? `↓` : `↑`
        },
        
    },
    methods: {
        ...mapActions('search', ['getSearchData']),
        // 删除面包屑（分类的名称和id）
        removeCategoryName() {
            // 删除searchParams中的categoryName
            this.searchParams.categoryName = undefined
            // 删除该分类的菜单id
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            // 将页码归1
            this.searchParams.pageNo = 1
            // 删除路由url中该分类的参数（但搜索数据不能删除）
            let query = { keyword: this.$route.query.keyword || undefined }
            this.$router.push({ path: '/search', query: query })  //重新再跳转一次路由，修改路由地址栏，watch监视属性就可以发送Ajax请求
        },
        // 删除面包屑（关键字面包屑）
        removeKeyword() {
            // 删除searchParams中的keyword
            this.searchParams.keyword = undefined
            // 通知HeaderVue组件将搜索框中的数据置空
            this.$bus.$emit('emptySearch')
            // 将页码归1
            this.searchParams.pageNo = 1
            // 删除路由url中keyword的参数（但三级分类数据不能删除）
            let query = Object.assign({}, this.$route.query)    //复制一份query参数(这是为了深拷贝，因为浅拷贝的参数不会引起路由跳转)
            delete query.keyword     //删除keyword路由
            this.$router.push({ path: '/search', query: query })  //重新再跳转一次路由，修改路由地址栏，watch监视属性就可以发送Ajax请求
        },
        // 组件的自定义事件（SearchSelector给SearchVue传递品牌参数）
        getBrand(brandObj) {
            // 拼接成请求参数的格式,存入参数数据中
            this.searchParams.trademark = brandObj.tmId + ':' + brandObj.tmName
            // 将页码归1
            this.searchParams.pageNo = 1
            // 携带trademark参数后再次请求数据
            this.getSearchData(this.searchParams)
        },
        // 删除面包屑（品牌信息面包屑）
        removeTrademark() {
            // 删除searchParams中的trademark
            this.searchParams.trademark = undefined
            // 将页码归1
            this.searchParams.pageNo = 1
            // 删除参数后重新发送请求
            this.getSearchData(this.searchParams)
        },
        // 组件自定义事件（SearchSelector给SearchVue传递商品属性参数）
        getProps(propObj) {
            // 将页码归1
            this.searchParams.pageNo = 1
            let prop = `${propObj.id}:${propObj.value}:${propObj.name}` //拼接请求参数
            // 判断是否已经有该属性的参数了,有了就直接return
            if(this.searchParams.props.indexOf(prop) !== -1){
                return
            }
            this.searchParams.props.push(prop)
            this.getSearchData(this.searchParams)
        },
        // 删除面包屑（商品属性面包屑）
        removeProps(propId) {
            // 将页码归1
            this.searchParams.pageNo = 1
            // 删除searchParams中对应id的prop（使用Set集合删除数组中的指定元素）
            let set_arr = new Set(this.searchParams.props)
            this.searchParams.props.forEach(prop => {
                if (propId == prop.split(':')[0]) {
                    set_arr.delete(prop)
                }
            });
            this.searchParams.props = [...set_arr]  //转成正常的数组，否则数据请求会出错
            // 删除参数后重新发送请求
            this.getSearchData(this.searchParams)
        },
        // 排序按钮点击事件
        orderHandler(id){
            // 将页码归1
            this.searchParams.pageNo = 1
            if(this.searchParams.order.includes('desc')){
                this.searchParams.order = `${id}:asc`
            }else{
                this.searchParams.order = `${id}:desc`
            }
            // 再次请求数据
            this.getSearchData(this.searchParams)
        },
        // 自定义事件：获取分页组件中选择的页码
        curPageNo(curPage){
            this.searchParams.pageNo = curPage
            // 再次请求数据
            this.getSearchData(this.searchParams)
        }
    },
    beforeMount() {
        // 挂载前：整理路由参数中的数据，传给Ajax请求
        Object.assign(this.searchParams, this.$route.query)
    },
    mounted() {
        // 页面第一次加载时：让vuex发送Ajax请求搜索页面数据
        this.getSearchData(this.searchParams)
    },
    watch: {
        // 当路由参数发送变化时，就要重新搜集数据和请求商品数据
        $route() {
            // 清空上次路由收集的菜单id
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            // 整理路由参数中的数据，传给Ajax请求
            Object.assign(this.searchParams, this.$route.query)
            // 让vuex发送Ajax请求搜索页面数据
            this.getSearchData(this.searchParams)
        }
    },
}
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .page {
                width: 733px;
                height: 66px;
                overflow: hidden;
                float: right;

                .sui-pagination {
                    margin: 18px 0;

                    ul {
                        margin-left: 0;
                        margin-bottom: 0;
                        vertical-align: middle;
                        width: 490px;
                        float: left;

                        li {
                            line-height: 18px;
                            display: inline-block;

                            a {
                                position: relative;
                                float: left;
                                line-height: 18px;
                                text-decoration: none;
                                background-color: #fff;
                                border: 1px solid #e0e9ee;
                                margin-left: -1px;
                                font-size: 14px;
                                padding: 9px 18px;
                                color: #333;
                            }

                            &.active {
                                a {
                                    background-color: #fff;
                                    color: #e1251b;
                                    border-color: #fff;
                                    cursor: default;
                                }
                            }

                            &.prev {
                                a {
                                    background-color: #fafafa;
                                }
                            }

                            &.disabled {
                                a {
                                    color: #999;
                                    cursor: default;
                                }
                            }

                            &.dotted {
                                span {
                                    margin-left: -1px;
                                    position: relative;
                                    float: left;
                                    line-height: 18px;
                                    text-decoration: none;
                                    background-color: #fff;
                                    font-size: 14px;
                                    border: 0;
                                    padding: 9px 18px;
                                    color: #333;
                                }
                            }

                            &.next {
                                a {
                                    background-color: #fafafa;
                                }
                            }
                        }
                    }

                    div {
                        color: #333;
                        font-size: 14px;
                        float: right;
                        width: 241px;
                    }
                }
            }
        }
    }
}
</style>