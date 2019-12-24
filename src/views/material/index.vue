<template>
<!-- 素材管理组件 -->
  <el-card>
        <!-- 标题处可放置面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">素材管理</template>
        </bread-crumb>
        <!-- 内容部分分为两项 以tab栏形式放置 -->
        <el-tabs v-model="activeName" @tab-click='changeTab'>
    <el-tab-pane label="全部图片" name="all">
      <!-- 将素材渲染到页面上 -->
      <div class="img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
          <el-row class="operate" type='flex' align='middle' justify='space-around'>
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </el-row>
        </el-card>
      </div>

    </el-tab-pane>
    <el-tab-pane label="收藏图片" name="collect">
      <div class="img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt="">
        </el-card>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!-- 公共分页组件 -->
  <el-row type='flex' justify='center'>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size='page.pageSize'
  :current-page='page.currentPage'
  @current-change='changePage'>
</el-pagination>
  </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      },
      activeName: 'all', // 当前默认选中标签
      list: []// 接收素材数据
    }
  },
  methods: {
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 点击标签获取相应内容
    changeTab () {
      this.page.currentPage = 1// 切换页签 强制回第一页
      this.getMaterial()
    },
    //   点击素材管理 获取素材信息（用变量接收） 并渲染得到页面上
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'// 判断当前点击的标签是不是收藏 true获取收藏图片 false获取全部图片
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results// 请求成功 接收数据 可能全部 可能收藏
        this.page.total = res.data.total_count
      })
    }
  },
  //   页面渲染完毕后 获取素材信息
  mounted () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
  .img-list {
    display: flex;
    flex-wrap: wrap;
    .img-card {
      width: 200px;
      height: 220px;
      margin: 20px 50px;
      position: relative;
      img {
        width: 100%;
      }
      .operate {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 20px;
        height: 40px;
        background-color: #f4f5f6;
        }
    }
  }
</style>
