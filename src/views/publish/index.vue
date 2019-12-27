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
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null
      }, // 定义个数据对象 接收表单数据
      rules: {
        //   校验规则  标题 内容 频道必填项（校验字段名：[{},{}]）
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度在5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
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
    publishArticle () {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          console.log('校验成功')
        }
      })
    }

  },
  //   钩子函数 实例构建完成后执行的函数
  created () {
    this.getChannels()
  }

}
</script>

<style>

</style>
