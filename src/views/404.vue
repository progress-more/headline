<template>
<!-- 404页面 在路由表中 一级路由 地址为* 可以匹配任何地址
但是优先匹配其他的地址 若其他组件匹配不到时 匹配该组件 -->
  <div class="back"></div>
</template>
<script>
export default {

}
</script>

<style scoped>
    .back {
        height: 100vh;
        background-image: url('../assets/img/bg1.jpg');
        background-size: cover;
    }
</style>
