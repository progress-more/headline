<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            文章列表
        </template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px;">
        <el-form-item label='文章状态:'>
          <!-- 放置单选组 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部-->
          <el-radio-group v-model="searchForm.status">
           <!-- 由于每个单选项必须有label属性 so在前端给全部定义一个状态码 -->
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
          {{ searchForm }}
        </el-form-item>
        <el-form-item label='频道列表:'>
          <!-- 频道是由后台返回的数据 so需先请求频道数据-->
          <el-select placeholder='请选择' v-model="searchForm.channel_id">
            <el-option v-for="item in channels" :key="item.id" :label='item.name' :value='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='时间选择:'>
          <!-- 日期选择器 选择日期后会生成一个数组 so应用一个数组变量存储该数据 而获取文章接口需传的参数是分开的-->
          <el-date-picker v-model="searchForm.dateRange" type='daterange'></el-date-picker>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认状态为全部
        channel_id: null, // 默认不选中任何一个分类
        dateRange: []// 定义数组变量存储日期范围数据
      },
      channels: []// 设置数组接收返回的频道数据
    }
  },
  methods: {
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
  }
}
</script>

<style>

</style>
