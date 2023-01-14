<template>
    <div>
        <!-- 商品分类导航组件——已经是全局组件了，因此不需要引入 -->
        <TypeNav></TypeNav>
        <!-- 列表组件 -->
        <ListContainer></ListContainer>
        <!-- 今日推荐 -->
        <TodayRecommend></TodayRecommend>
        <!-- 商品排行 -->
        <RankGoods></RankGoods>
        <!-- 猜你喜欢 -->
        <GuessLike></GuessLike>
        <!-- 商品楼层 -->
        <FloorGoods v-for="list of floorList" :key="list.id" :list = list></FloorGoods>
        <!-- 商品商标 -->
        <BrandGoods></BrandGoods>
    </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
// 注册组件
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import TodayRecommend from '@/pages/Home/TodayRecommend/TodayRecommend.vue'
import RankGoods from "@/pages/Home/RankGoods/RankGoods.vue";
import GuessLike from "@/pages/Home/GuessLike/GuessLike.vue";
import FloorGoods from "@/pages/Home/FloorGoods/FloorGoods.vue";
import BrandGoods from "@/pages/Home/BrandGoods/BrandGoods.vue";

export default {
    name: 'HomeVue',
    components: {
        ListContainer,
        TodayRecommend,
        RankGoods,
        GuessLike,
        FloorGoods,
        BrandGoods
    },
    computed: {
        ...mapState('home', ['floorList'])
    },
    methods:{
        ...mapActions('home', ['getFloorList'])
    },
    mounted(){
        this.getFloorList()
    }

}
</script>
<style scoped lang="less">

</style>