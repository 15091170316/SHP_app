<template>
  <div class="spec-preview">
    <img :src="skuImageList[curImgIndex].imgUrl" />
    <div class="event" @mousemove="moveHandler" ref="smallBox"></div>
    <div class="big">
      <img :src="skuImageList[curImgIndex].imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "ZoomVue",
    props: ['skuImageList'],
    data(){
      return{
        curImgIndex: 0  //当前的显示的图片数组角标
      }
    },
    mounted(){
      // 得到当前展示的图片数组角标
      this.$bus.$on('getIndex', (index)=>{this.curImgIndex = index})
    },
    methods:{
      moveHandler(event){
        // 蒙版dom对象
        let mask = this.$refs.mask
        // 小图片盒子的dom对象
        let smallBox = this.$refs.smallBox
        // 大图片的dom对象
        let bigImg = this.$refs.bigImg
        // 计算蒙版的移动位置
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        // 限制蒙版的移动范围
        if(left < 0) left = 0
        if(left > smallBox.offsetWidth - mask.offsetWidth) left = smallBox.offsetWidth - mask.offsetWidth
        if(top < 0) top = 0
        if(top > smallBox.offsetHeight - mask.offsetHeight) top = smallBox.offsetHeight - mask.offsetHeight
        // 移动蒙版位置
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        // 移动大图片位置(这是二倍图，所以*2)
        bigImg.style.left = -(2 * left) + 'px'
        bigImg.style.top = -(2 * top) + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>