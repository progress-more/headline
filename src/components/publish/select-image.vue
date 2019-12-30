<template>
  <!-- 弹层内又有许多操作  so再放置一个组件 专门用于选择图片 -->
  <el-tabs v-model="activeName">
      <el-tab-pane label='素材库' name='material'>
          <!-- 外层容器 -->
          <div class="select-image-list">
              <!-- 内部循环card -->
            <el-card class="image-card" v-for="item in list" :key="item.id">
                <!-- 因 选择图片需将图片在父组件中显示 so 需将图片地址传递出去 so点击事件 -->
                <img @click='clickImg(item.url)' :src="item.url" alt="">
            </el-card>
          </div>
          <el-row type='flex' justify='center' align='middle' style="height:80px;">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="page.total"
              :current-page='page.currentPage'
              :page-size='page.pageSize'
              @current-change='changePage'>
            </el-pagination>
          </el-row>
      </el-tab-pane>
      <el-tab-pane label='上传图片' name='upload'>上传图片</el-tab-pane>

  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中的时素材库
      list: [], // 接收素材管理的数据
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    //   点击图片时触发
    clickImg (url) {
    //   将图片地址传给封面组件 即子传父
      this.$emit('selectOneImg', url) // Vue中可以不用全小写
    },
    //   改变当前页码
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getAllImg()
    },
    //   获取所有图片素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
    .select-image-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .image-card {
            width: 150px;
            height: 150px;
            margin: 20px 20px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
