<template>
    <div class="type-nav">
        <div class="container" @mouseleave="leaveTypeNavHandler">
            <h2 class="all" @mouseenter="showTypeNav = true">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 添加菜单过渡效果 -->
            <transition name="sort">
                <div class="sort" v-show="showTypeNav">
                    <div class="all-sort-list2" @click="clickAHandler">
                        <!-- 一级菜单 -->
                        <div class="item" v-for="c1, index of typeNavData" :key="c1.categoryId"
                            @mouseenter="currentIndex = index" :class="{ current: currentIndex === index }">
                            <h3>
                                <a :data-categoryName="c1.categoryName" :data-categroy1ID="c1.categoryId">{{
                                    c1.categoryName
                                }}</a>
                            </h3>
                            <div class="item-list clearfix" v-show="currentIndex === index">
                                <div class="subitem">
                                    <!-- 二级菜单 -->
                                    <dl class="fore" v-for="c2 of c1.categoryChild" :key="c2.categoryId">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-categroy2ID="c2.categoryId">{{
                                                c2.categoryName
                                            }}</a>
                                        </dt>
                                        <dd>
                                            <!-- 三级菜单 -->
                                            <em v-for="c3 of c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName"
                                                    :data-categroy3ID="c3.categoryId">{{
    c3.categoryName
                                                    }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
// 引入vuex辅助map
import { mapState } from 'vuex'

export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,    // 一级菜单鼠标悬浮的index
            showTypeNav: this.$route.meta.showTypeNav   //一级菜单是否展示
        }
    },
    computed: {
        ...mapState('home', ['typeNavData']),
    },
    methods: {
        // 鼠标离开菜单时的操作
        leaveTypeNavHandler() {
            this.currentIndex = -1     //隐藏二三级菜单
            // 隐藏一级菜单（非/home路由组件）
            if (this.$route.path !== '/home') {
                this.showTypeNav = false
            }
        },
        // 三级联动路由跳转的事件委派(将事件委派到它们的父级元素上，在通过data-自定义属性识别a标签)
        clickAHandler(event) {
            //将点击的标签身上的自定义属性解构出来（没有的就是undefined）
            let { categoryname, categroy1id, categroy2id, categroy3id } = event.target.dataset
            if (categoryname) {   //有categoryName就是a标签
                let location = { path: '/search' }    //路由跳转路径
                let query = { categoryName: categoryname }    //路由跳转携带的query参数
                if (categroy1id) {    // 这些自定义属性用来区分是第几级的菜单，并传递id参数
                    query.category1ID = categroy1id
                } else if (categroy2id) {
                    query.category2ID = categroy2id
                } else if (categroy3id) {
                    query.category3ID = categroy3id
                }
                // 合并完整的参数
                location.query = query
                // 路由跳转
                this.$router.push(location)
            }
        }
    }
}
</script>
<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .current {
                    background-color: skyblue;
                }

                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                        }
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // 使用js实现
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }

        // 导航菜单过渡效果
        .sort-enter-active,
        .sort-leave-active {
            overflow: hidden;
            transition: all .1s linear;
        }

        .sort-enter,
        .sort-leave-to {
            height: 0;
        }

        .sort-enter-to,
        .sort-leave {
            height: 461px;
        }
    }
}
</style>