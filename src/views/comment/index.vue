<template>
    <!-- 评论列表组件  -->
    <!-- 分为上标题 下内容布局 故可用elementui中的卡片布局 -->
    <el-card>
        <!-- 标题处可放置面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">评论管理</template>
        </bread-crumb>
        <!-- 列表部分  表单组件-->
         <!-- 将请求回来的数据渲染到页面上 label表示表头 prop字段名 表示内容区域显示信息 -->
         <!-- el-table 标签上需绑定 要显示的数据数组 -->
        <el-table :data='list' v-loading='loading'>

            <el-table-column prop = 'title' width = '600px' label = '标题'></el-table-column>
            <el-table-column :formatter='formatterBoolean' prop = 'comment_status' label = '评论状态'></el-table-column>
            <el-table-column prop = 'total_comment_count' label = '总评论数'></el-table-column>
            <el-table-column prop = 'fans_comment_count' label = '粉丝评论数'></el-table-column>
            <!-- 作用域插槽 可取到 插槽标签（slot）上的属性对象-->
            <el-table-column label = '操作' >
                <template slot-scope="obj">
                <!-- 用elementUI插件中 按钮 的文字按钮 -->
                <el-button size='small' type='text'>修改</el-button>
                <!-- 根据elementUI表格属性介绍可知 插槽标签上有一个row属性代表当前行数据 -->
                <!-- 关闭打开评论 是根据评论状态决定的 -->
                <el-button @click="openOrCloseState(obj.row)" size='small' type='text'>{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
                <!-- 点击打开或关闭评论时 要改变评论的状态 并重新获取数据 -->
                </template>
            </el-table-column>
        </el-table>
        <el-row type='flex' justify='center' align='middle' style="height:80px;" >
          <el-pagination
  background
  layout="prev, pager, next"
  :current-page='page.currentPage'
  :page-size='page.pageSize'
  :total="page.total"
  @current-change='currentChange'>
</el-pagination>
<!-- 根据elementUI上 分页组件的标签自定义属性
给标签绑定需要的属性：当前页，每页条数，总条数等;
2.当用户点击某一页的时候 需跳到某一页 且更新内容；此时elementUI分页组件上有个事件 需监听下 调用函数即可  -->
        </el-row>
    </el-card>
</template>

<script>
export default {
  // 点击评论列表 显示评论数据
  // 先在组件中定义一个数据列表 接收请求回来的评论数据
  data () {
    return {
      loading: false,
      list: [],
      page: {
        total: 0, // 文章总条数
        currentPage: 1, // 当前页码 默认为1
        pageSize: 10// 每页条数 默认为10
      }
    }
  },
  methods: {
    // 页码改变事件
    currentChange (newpage) {
      this.page.currentPage = newpage
      this.getComment()
    },
    //   设置方法 获取列表数据
    getComment () {
      this.loading = true// 获取评论数据且加载前显示加载进度条
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        // 获取数据后 将请求回来的数据渲染到页面上
        // 将文章的总条数 给分页的变量
        this.page.total = res.data.total_count
        setTimeout(() => { this.loading = false }, 300)
      })
    },
    // 定义一个格式化函数 根据评论状态 决定显示信息
    formatterBoolean (row, column, cellValue, index) {
      // row 代表当前行数据
      // column 当前列信息
      // cellValue 当前的单元格的值
      // index 索引
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论
    openOrCloseState (row) {
      // 直接调用接口
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定要${mess}评论吗`, '提示').then(() => {
        // 调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          // 因用json-bigint包之后 row。id为对象类型 需转为字符串
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status } // 因为当前如果是打开 ,就要关闭 如果是关闭 就要打开
        }).then(result => {
          //  表示执行成功
          this.getComment() // 重新拉取评论管理数据
        })
      })
    }
  },
  //   页面渲染完成后 执行获取评论列表请求
  mounted () {
    this.getComment()
  }
}
</script>

<style>

</style>
