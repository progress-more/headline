<template>
    <!-- 用elementUI布局 -->
    <el-container>
        <el-aside style="width:230px;">
            <!-- 一般组件 -->
            <layout-aside></layout-aside>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 一般组件 -->
                右侧头部
                <layout-header></layout-header>
            </el-header>
            <el-main>
                <!-- 这块是变化的 so设置一个路由组件 在此放路由容器 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
