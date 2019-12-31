<template>
    <!-- 用elementUI布局 -->
    <el-container>
        <!-- 侧边栏的宽度是根据collapse的状态来判断的 但是设宽高是在布局上设
        而隐藏标签则需要在子组件侧边栏中设置 so需将collapse变量再次传递到侧边栏组件 父传子-->
        <el-aside :style="{width: collapse ? '60px': '230px'}" style="min-height:100vh;background-color:#353b4e;width:230px;">
            <!-- 一般组件 -->
            <layout-aside :collapse='collapse'></layout-aside>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 一般组件 -->

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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false // 默认是展开  设置跟头部组件一样的变量 方便做后续操作
    }
  },
  created () {
    //   实例一创建就进行监听
    eventBus.$on('changeCollapse', () => {
      // 头部组件传递信息 侧边栏需改变
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
