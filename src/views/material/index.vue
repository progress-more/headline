<template>
<!-- 素材管理组件 -->
  <el-card>
        <!-- 标题处可放置面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">素材管理</template>
        </bread-crumb>
        <!-- 内容部分分为两项 以tab栏形式放置 -->
        <el-tabs v-model="activeName">
            <el-tab-pane label='全部图片' name='all'>全部图片</el-tab-pane>
            <el-tab-pane label='收藏图片' name='collect'>收藏图片</el-tab-pane>
        </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'// 当前默认选中标签
    }
  }
}
</script>

<style>

</style>
