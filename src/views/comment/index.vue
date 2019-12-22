<template>
    <!-- 评论列表组件  -->
    <!-- 分为上标题 下内容布局 故可用elementui中的卡片布局 -->
    <el-card>
        <!-- 标题处可放置面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">评论管理</template>
        </bread-crumb>
        <!-- 列表部分  表单组件-->
        <el-table>
            <el-table-column width = '600px' label = '标题'></el-table-column>
            <el-table-column label = '评论状态'></el-table-column>
            <el-table-column label = '总评论数'></el-table-column>
            <el-table-column label = '粉丝评论数'></el-table-column>
            <el-table-column label = '操作'></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
