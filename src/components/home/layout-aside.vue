<template>
  <!-- 左侧导航组件 -->

  <div class="layout-aside">
      <div class="title">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 导航组件el-menu 默认垂直模式 mode属性设置水平垂直；
  submenu组件可生成二级菜单 menu还提供了bgc,text-color,active-text-color等样式-->
    <el-menu router background-color='#353b4e' text-color=' #adafb5' active-text-color=' #ffd04b'>
        <!-- 导航点击需跳转相应页面 so在el-menu上添加router属性 开启路由;
        启用该模式会在激活导航时以index为path进行路由跳转 -->
        <el-menu-item index='/home'>首页</el-menu-item>
        <el-submenu index='1'>
            <!-- 具名插槽 -->
            <span slot="title">内容管理</span>
            <!-- 匿名插槽 -->
            <el-menu-item index='/home/publish'>发布文章</el-menu-item>
            <el-menu-item index='/home/articles'>文章列表</el-menu-item>
            <el-menu-item index='/home/comment'>评论管理</el-menu-item>
            <el-menu-item index='/home/material'>素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
            <!-- 具名插槽 -->
            <span slot="title">粉丝管理</span>
            <!-- 匿名插槽 -->
            <el-menu-item index='/home/picture'>图文数据</el-menu-item>
            <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
            <el-menu-item index='/home/fanspicture'>粉丝画像</el-menu-item>
            <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>

</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-aside {

        background-color: #323745;
        height: 100vh;
        .el-menu {
            border-right:none;
        }
        .title {
            background-color:  #2e2f32;
            text-align: center;
            padding:10px 0;
            img {
                height: 35px;
            }
        }
    }
</style>
