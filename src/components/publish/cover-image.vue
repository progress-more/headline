<template>
  <div class="cover-image">
    <div @click='openDialog(index)' class="cover-image-item" v-for="(item,index) in list" :key="index">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <el-dialog @close='closeDialog' :visible='dialogVisible'>
      <select-image @selectOneImg='receiveImg'></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      selectIndex: -1, // 用来存储点击的哪个图片的下标
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    // 接收选择图片组件 传递的图片地址
    receiveImg (url) {
      //  此时展现的图片都是从publish父组件中 传递过来的
      // props 只能读取 不能修改 只能在publish中改 需再向父组件中传值
      this.$emit('selectTwoImg', url, this.selectIndex) // 再次传递
      // 接受完图片后 要将对话框关闭
      this.closeDialog()
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index // 记录当前点击的是哪个图片
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false
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
