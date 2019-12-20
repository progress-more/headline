<template>
<!-- 使用elementUI的栅格布局 给主页的头部进行布局 -->
    <el-row class="layout-header" type='flex' align='middle'>
        <!-- 先定义一行 又 分为两部分 so定义两列各占一半-->
        <el-col :span='12' class="left">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <!-- 右侧内容需靠右显示 so 第二列内在设一行 设弹性布局 使主轴向右对齐-->
        <el-col :span='12' class="right">
            <el-row type='flex' justify='end' align='middle'>
               <el-input style="width:200px;margin-right:10px;"  placeholder='请输入内容' prefix-icon='el-icon-search'></el-input>
                <span>消息</span>
                <img src="../../assets/img/avatar.jpg" alt="">
                <!-- 下拉菜单 -->
                <el-dropdown>
                    <!-- 匿名插槽 -->
                    <span>我有橡胶果实<i class="el-icon-arrow-down "></i></span>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>git地址</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 60px;
        .left {
            font-size: 20px;
            color:#2c3e50;
            span {
                font-size: 16px;
                margin-left: 5px;
            }
        }
        .right {
            img {
                margin: 0 10px;
                border-radius: 50%;
            }
        }
    }
</style>
