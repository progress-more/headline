<template>
  <div class="cover-image">
    <div @click='openDialog' class="cover-image-item" v-for="(item,index) in list" :key="index">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog @close='dialogVisible = false' :visible='dialogVisible'></el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    // 打开弹层
    openDialog () {
      this.dialogVisible = true
    }
  }

}
</script>

<style lang='less' scoped>
  .cover-image {
    margin: 20px 0;
    display: flex;
    .cover-image-item {
      border:1px solid #ccc;
      width: 220px;
      height: 220px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
