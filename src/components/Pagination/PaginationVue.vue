<template>
    <div class="pagination">
        <!-- 上 -->
        <button :disabled="pageNo <= 1" @click="pageNoHandler(pageNo-1)">上一页</button>
        <button v-if="startAndEndPage.start > 1" @click="pageNoHandler(1)">1</button>
        <button v-if="startAndEndPage.start > 2">···</button>

        <!-- 中 -->
        <button 
            v-for="page, index of startAndEndPage.end-startAndEndPage.start+1" :key="index"  
            @click="pageNoHandler(page + startAndEndPage.start- 1)"
            :class="{active:pageNo == (page + startAndEndPage.start- 1)}">
            {{ page + startAndEndPage.start- 1}}
        </button>

        <!-- 下 -->
        <button v-if="startAndEndPage.end < totalPage-1">···</button>
        <button v-if="startAndEndPage.end < totalPage" @click="pageNoHandler(totalPage)">{{ totalPage }}</button>
        <button :disabled="pageNo >= totalPage" @click="pageNoHandler(pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>

</template>

<script>
export default {
    name: 'PaginationVue',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        // 中间部分的起始页和最后页
        startAndEndPage() {
            let start = this.pageNo - parseInt(this.continues / 2)
            let end = this.pageNo + parseInt(this.continues / 2)
            if (this.totalPage < this.continues) {  //总页数 < 连续页码时
                start = 1
                end = this.totalPage
            } else {    //总页数 > 连续页码时
                if (start < 1) {
                    start = 1
                    end = this.continues
                }
                if (end > this.totalPage) {
                    end = this.totalPage
                    start = this.totalPage - this.continues + 1
                }
            }
            return { start, end }
        },
    },
    methods:{
        // 给父组件传递当前点击的页码
        pageNoHandler(pageNo){
            this.$emit('curPageNo', pageNo)
        }
    }
}
</script>

<style scoped lang="less">
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>