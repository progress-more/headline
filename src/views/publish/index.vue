<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">发表文章</template>
      </bread-crumb>
      <el-form label-width='100px'>
        <el-form-item label='标题:'>
            <el-input style="width:300px;" placeholder='文章名称'></el-input>
        </el-form-item>
        <el-form-item label='内容:'>
            <el-input :rows='8' type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='封面:'>
            <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
            <el-radio-group v-model='coverType'>
                <el-radio label='1'>单图</el-radio>
                <el-radio label='3'>三图</el-radio>
                <el-radio label='0'>无图</el-radio>
                <el-radio label='-1'>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label='频道:'>
            <el-select placeholder='请选择'>
                <!-- label显示内容 value绑定内容 -->
               <el-option :label='item.name' :value='item.id' v-for="item in channels" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='primary'>发表</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      coverType: '',
      channels: []// 接收频道数据
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
