<template>
<!-- 素材管理组件 -->
  <el-card v-loading='loading'>
        <!-- 标题处可放置面包屑组件 -->
      <bread-crumb slot="header">
          <template slot="title">素材管理</template>
      </bread-crumb>
      <el-row type='flex' justify='end'>
        <!-- 上传组件  默认需要设置action属性放置上传地址 若需自定义上传行为方法 需将action属性设为空 并设置http-request属性 -->
        <el-upload action='' :http-request= 'uploading' :show-file-list='false'>
          <el-button type='primary' size='small'>上传图片</el-button>
        </el-upload>
      </el-row>
        <!-- 内容部分分为两项 以tab栏形式放置 -->
      <el-tabs v-model="activeName" @tab-click='changeTab'>
        <el-tab-pane label="全部图片" name="all">
        <!-- 将素材渲染到页面上 -->
        <div class="img-list">
          <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
            <img @click='openDialog(index)' :src="item.url" alt="">
            <el-row class="operate" type='flex' align='middle' justify='space-around'>
              <!-- 需要根据当前是否收藏的状态 来决定是否添加字体颜色 -->
              <i @click='collectOrCancel(item)' :style="{ color: item.is_collected ? 'red' : '#000' }" class="el-icon-star-on"></i>
              <i @click='delMaterial(item.id)' class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>

      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <img @click='openDialog(index)' :src="item.url" alt="">
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
  <el-dialog @opened='openEnd' :visible="dialogVisible" @close='dialogVisible = false'>
     <el-carousel ref="myCarousel" indicator-position="outside" height='500px'>
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <img style="width:100%;height:100%" :src="item.url" alt="">
    </el-carousel-item>
  </el-carousel>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      loading: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      },
      activeName: 'all', // 当前默认选中标签
      list: [], // 接收素材数据
      clickIndex: -1 // 点击的index
    }
  },
  methods: {
    // 打开动画结束时的回调 确保能取到数据
    openEnd () {
      // alert(1)
      // 此时已经可以获取走马灯实例 获取元素ref
      // 就可以给走马灯设置 当前要显示的图片索引 组件上有方法
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      // dialog是懒加载 第一次没有弹出来前 是没有组件元素的
      // 没法再弹层中立刻做设置索引 需在点击打开弹层时传入索引
      // 并存储下来 so定义变量
      this.clickIndex = index
    },
    // 删除图片素材
    delMaterial (id) {
      this.$confirm('你确定要删除此图片吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.getMaterial()// 重新获取数据
        })
      })
    },
    // 收藏或取消收藏
    collectOrCancel (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: {
          collect: !item.is_collected
        }
      }).then(res => {
        this.getMaterial()
      })
    },
    // 上传图片
    uploading (params) {
      // 由于需将图片上传 so需设形参接收 要传的文件就在参数对象的属性中
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)// 文件加入到参数中
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.loading = false
        // 上传成功 重新获取数据
      })
    },
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
