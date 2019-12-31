<template>
  <!-- 左侧导航组件 -->

  <div class="layout-aside">
      <div class="title">
        <img :src="collapse ? smallImg : bigImg" alt="">
      </div>
      <!-- 导航组件el-menu 默认垂直模式 mode属性设置水平垂直；
  submenu组件可生成二级菜单 menu还提供了bgc,text-color,active-text-color等样式-->
 <!-- 提供了collapse属性 设置是否需要水平折叠收起菜单 -->
 <el-menu :collapse='collapse' router background-color='#353b4e' text-color=' #adafb5' active-text-color=' #ffd04b'>
        <!-- 导航点击需跳转相应页面 so在el-menu上添加router属性 开启路由;
        启用该模式会在激活导航时以index为path进行路由跳转 -->
        <!-- 若要添加图片 需要将文字用span标签包起来 -->
        <el-menu-item index='/home'>
        <i class="el-icon-s-home"></i><span>首页</span>
        </el-menu-item>
        <el-submenu index='1'>
            <!-- 具名插槽 -->
            <i slot="title" class="el-icon-tickets"></i>
            <span slot="title">内容管理</span>
            <!-- 匿名插槽 -->
            <el-menu-item index='/home/publish'>发布文章</el-menu-item>
            <el-menu-item index='/home/articles'>文章列表</el-menu-item>
            <el-menu-item index='/home/comment'>评论管理</el-menu-item>
            <el-menu-item index='/home/material'>素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
            <!-- 具名插槽 -->
            <template slot="title">
                <i class="el-icon-orange"></i>
                <span>粉丝管理</span>
            </template>
            <!-- 匿名插槽 -->
            <el-menu-item index='/home/picture'>图文数据</el-menu-item>
            <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
            <el-menu-item index='/home/fanspicture'>粉丝画像</el-menu-item>
            <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index='/home/userInfo'>
            <i class="el-icon-s-custom"></i>
            <span>账户信息</span>
        </el-menu-item>
    </el-menu>
  </div>

</template>

<script>
export default {
  props: ['collapse'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
    .layout-aside {

        background-color: #323745;

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
