<template>
<!-- index.Vue为外部框架 home-main.Vue 为内部内容-->
    <div>
        <!-- 放置走elementUI马灯组件 -->
        <el-carousel type='card' height='500px' :interval='2000' arrow = 'always'>
            <el-carousel-item v-for="item in list" :key = 'item'>
                <img :src="item" style="height:100vh" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 设置走马灯图片数组
      // 只能http地址
      list: ['http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b21c8701a18b87d608167af6050828381e30fd87.jpg',
        'http://file.mumayi.com/forum/201401/16/202014h22z6jt6vpajypd0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4288985176,26992066&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2129829440,3036007475&fm=26&gp=0.jpg']
    }
  }

}
</script>

<style lang='less' scoped>

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
