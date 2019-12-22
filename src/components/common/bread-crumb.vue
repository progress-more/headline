<template>
  <!--  创建一个面包屑组件  用于显示当前页面的路径 快速返回之前的任意页面-->
  <el-breadcrumb separator='>'>
      <el-breadcrumb-item to='/home'>首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 第二个为动态显示 设置具名插槽-->
          <slot name="title"></slot>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
