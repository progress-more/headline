<template>
  <el-card class="articles">
      <bread-crumb slot="header">
        <template slot="title">
            文章列表
        </template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px;">
        <el-form-item label='文章状态:'>
          <!-- 放置单选组 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
          <!-- <el-radio-group v-model="searchForm.status" @change='changeCondition'>
           由于每个单选项必须有label属性 so在前端给全部定义一个状态码 -->
            <!-- <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group> -->
          <!-- 第二种 深度监听 -->
          <el-radio-group v-model="searchForm.status">
           <!-- 由于每个单选项必须有label属性 so在前端给全部定义一个状态码 -->
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='频道列表:'>
          <!-- 频道是由后台返回的数据 so需先请求频道数据-->
          <!-- <el-select @change="changeCondition" placeholder='请选择' v-model="searchForm.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label='item.name' :value='item.id'></el-option>
          </el-select> -->
          <!-- 第二种 深度监听 -->
          <el-select placeholder='请选择' v-model="searchForm.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label='item.name' :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='时间选择:'>
          <!-- 日期选择器 选择日期后会生成一个数组 so应用一个数组变量存储该数据 而获取文章接口需传的参数是分开的-->
          <!-- 日期选择器默认生成的数据格式 不符合参数格式需转化 用组件中属性 -->
          <!-- <el-date-picker value-format='yyyy-MM-dd' @change="changeCondition" v-model="searchForm.dateRange" type='daterange'></el-date-picker> -->
          <!-- 第二种 深度监听 -->
          <el-date-picker value-format='yyyy-MM-dd' v-model="searchForm.dateRange" type='daterange'></el-date-picker>
        </el-form-item>
        <!-- 搜索区域有三个条件 为组合条件 当任何一个发生变化时 都要先组装条件 统一发送请求 ;
        两种方式：监听每个组件的change事件；用watch深度监听 -->
      </el-form>
      <!-- 文章内容部分 -->
      <el-row class="total" type='flex' align='middle'>
        <span>共找到1000条符合条件的内容</span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
         <!-- 左侧 -->
         <div class="left">
           <!-- img中的图片路径 根据获取文章列表接口返回的数据总封面图片数组的长度 判断有几张图片或没有-->
           <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
           <div class="info">
             <span>{{item.title}}</span>
             <!-- tag标签 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
             <!-- 因为此时状态为多个 三元表达式满足不了 so用过滤器 -->
             <!-- 由于tag标签的颜色即type类型 也随文章状态的变化而变化 so 需再设一个过滤器 -->
             <el-tag :type='item.status |filterType'>{{item.status | filterStatus}}</el-tag>
             <span class="date">{{item.pubdate}}</span>
           </div>
         </div>
         <!-- 右侧 -->
         <div class="right">
           <span @click='toModify(item.id)'><i class="el-icon-edit"></i>修改</span>
           <span @click='deleteMaterial(item.id)'><i class="el-icon-delete"></i>删除</span>
         </div>
      </div>
      <el-row type='flex' justify='center' align='middle' style="height:80px;">
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
        pageSize: 10,
        currentPage: 1
      },
      searchForm: {
        status: 5, // 默认状态为全部
        channel_id: null, // 默认不选中任何一个分类
        dateRange: []// 定义数组变量存储日期范围数据
      },
      channels: [], // 设置数组接收返回的频道数据
      list: [], // 设置数组接收返回的文章数据
      images: [], // 接收返回的封面图片数据
      defaultImg: require('../../assets/img/light01.jpg')
    }
  },
  watch: {
    searchForm: {
      deep: true,
      handler () {
        // 此时数据已最新 this指向组件实例 参数改变
        // alert(this.searchForm.status)
        this.changeCondition()
      }
    }
  },
  // 文章状态过滤器
  filters: {

    filterStatus (value) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      // 根据状态返回相应的内容 放置页面上
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      // 根据状态返回相应的内容 放置页面上
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 去修改页面 实际就是发布页面
    // 但是修改页面需要带参数 so需另设一个路由 与发布页面区分开 否则会相互影响
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
      // 此时当两个不同的路由地址 对应同一个组件时 相互跳转 组件并未销毁  so 数据不会重置 两个功能会相互影响
      // so 需用到Vue官网的解决方法 在共同的组件上监听$route
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage// 最新页码给当前页面
      // 由于当选择有条件时 改变页码也要附加当时条件 so需将改变条件的参数 传入获取文章的函数中
      // 此时跟删选文章重复颇多 需提取
      this.getConditionArticles()
    },
    // 删除文章
    deleteMaterial (id) {
      // 先提示再请求删除
      this.$confirm('是否确定要删除文件?').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getConditionArticles()
        })
      })
    },
    // 搜索条件改变时
    changeCondition () {
      // 重置页码为第一页
      this.page.currentPage = 1
      this.getConditionArticles()
    },
    getConditionArticles () {
      // 当条件改变时 请求参数改变 so声明一个参数对象变量
      let params = {
        page: this.page.currentPage, // 当前页码
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 由于5是前端自己定义的标识 若是5 则什么也不传 为全部
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 起始时间
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 页面结构创建完成后 需将页面上的数据变成动态的 so 请求文章数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results// 获取文章列表数据
        this.page.total = res.data.total_count
      })
    },
    // 获取所有频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
    // 第一次获取文章数据时 没有参数 但是每页条数与当前页是要传的 又 这的获取函数只执行一次 so直接写默认页就行
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang='less' scoped>
  .articles {
    .total {
      height: 60px;
      border-bottom:  1px dashed #ccc;
    }
    .article-item {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #f2f3f5;
      .left {
        display: flex;
        img {
          width: 180px;
          height: 120px;
          border-radius: 5px;
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          height: 120px;
          justify-content: space-around;
          .date {
            color: #999;
            font-size: 12px;
          }
          .el-tag {
            text-align: center;
            width: 60px;
          }
        }
      }
      .right {
        span {
          font-size: 14px;
          margin-right: 8px;
          cursor: pointer;

        }
      }
    }
  }
</style>
