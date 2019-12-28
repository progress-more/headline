<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">发表文章</template>
      </bread-crumb>
      <el-form ref="publishForm" :model='formData' :rules='rules' label-width='100px'>
        <el-form-item prop='title' label='标题:'>
            <el-input v-model="formData.title" style="width:300px;" placeholder='文章名称'></el-input>
        </el-form-item>
        <el-form-item prop='content' label='内容:'>
            <el-input v-model="formData.content" :rows='8' type='textarea'></el-input>
        </el-form-item>
        <el-form-item prop='cover' label='封面:'>
            <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
            <el-radio-group v-model="formData.cover.type">
                <el-radio label='1'>单图</el-radio>
                <el-radio label='3'>三图</el-radio>
                <el-radio label='0'>无图</el-radio>
                <el-radio label='-1'>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop='channel_id' label='频道:'>
            <el-select v-model="formData.channel_id" placeholder='请选择'>
                <!-- label显示内容 value绑定内容 -->
               <el-option :label='item.name' :value='item.id' v-for="item in channels" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='primary' @click='publishArticle()'>发表</el-button>
            <el-button @click='publishArticle(true)'>存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 放置封面地址的数组
        },
        channel_id: null // 频道id
      }, // 定义个数据对象 接收表单数据
      rules: {
        //   校验规则  标题 内容 频道必填项（校验字段名：[{},{}]）
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度在5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    // 处理 两个地址对应一个组件跳转的时候 组件不销毁 数据没有重置的问题
    $route: function (to, from) {
      // 这里to是个对象 两个功能跳转时的不同 是params的不同
      if (to.params.articleId) {
        // 修改页面
      } else {
        // 发布页面 需清空内容（即表单数据清空即可 数据影响视图）
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    //   获取文章频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    // 发表或保存时 手动校验所有表单
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          // 校验完成 发送请求时 需判断时发布文章还是修改文章
          // 即根据 地址栏中有没有articleID决定 so获取地址栏携带参数 判断有无articleID
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/article',
            method: articleId ? 'put' : 'post',
            params: {
              draft
            },
            data: this.formData
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 根据传递的id 获取对应文章信息 并渲染页面
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
      // 由于定义表单数据formData的时  就是根据该接口返回数据的内容定义的
      // so 除了表单中没有的id 外其他的都有 所以可用表单数据接收 返回数据
        this.formData = res.data
      })
    }

  },

  //   钩子函数 实例构建完成后执行的函数
  created () {
    this.getChannels()
    // 当用户点击修改 跳转到该页面时 需在该组件实例一创建就获取地址栏内 传递的文章id参数
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId) // 如果有id值时才可调用此方法
  }

}
</script>

<style>

</style>
