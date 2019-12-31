<template>
<!-- 使用elementUI的栅格布局 给主页的头部进行布局 -->
    <el-row class="layout-header" type='flex' align='middle'>
        <!-- 先定义一行 又 分为两部分 so定义两列各占一半-->
        <el-col :span='12' class="left">
            <i @click='collapseOrOpen' :class="{'el-icon-s-unfold':collapse,'el-icon-s-fold':!collapse}"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <!-- 右侧内容需靠右显示 so 第二列内在设一行 设弹性布局 使主轴向右对齐-->
        <el-col :span='12' class="right">
            <el-row type='flex' justify='end' align='middle'>
               <el-input style="width:200px;margin-right:10px;"  placeholder='请输入内容' prefix-icon='el-icon-search'></el-input>
                <span>消息</span>
                <!-- 若img是固定地址的话 在代码编译时 会将img的图片编译成base64的字符串，此时是可以预览的；
                但本项目中图片地址有可能是固定有可能不是 是个动态变量 ；
                img是动态变量时 给一个相对地址是不能让图片显示的；
                如果想显示 需要先将图片转化成变量 在动态显示 -->
                <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
                <!-- 用户也有可能不传图片 此时photo为空 需设默认头像 so需判断 这里采用三元表达式 -->
                <!-- 下拉菜单 -->
                <el-dropdown @command='clickMenu'>
                    <!-- 打开主页后需获取用户信息 即调用接口
                    查询用户信息 展示到页面 -->
                    <!-- 匿名插槽 -->
                    <!-- 将获取到的用户信息放到页面上 -->

                    <span>{{userInfo.name}}<i class="el-icon-arrow-down "></i></span>
                    <!-- 具名插槽 -->
                    <!-- 当点击下拉菜单项时 需触发对应的事件 so添加指令事件
                    步骤：1.给el-dropdown组件标签添加监听事件 @command='clickMenu'；
                    2.给el-dropdown-item 标签上添加command='属性名'属性，组件上监听该属性；
                    3. 在Vue实例上添加监听方法 传入command参数，根据情况添加方法 -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                        <el-dropdown-item command='git'>git地址</el-dropdown-item>
                        <el-dropdown-item command='lgout'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false, // 默认侧边栏展开 图标箭头向左 以此改变图标类名
      userInfo: {}, // 定义一个数据对象接收请求回来的数据
      defaultImg: require('../../assets/img/avatar.jpg')// 先用require将图片转化成一个变量
    }
  },
  methods: {
    // 折叠或打开侧边栏
    collapseOrOpen () {
      this.collapse = !this.collapse // 不是展开就是折叠
      // 同时 要根据collapse的状态 来改变侧边栏的宽度
      // 由于侧边栏在另一个组件 so需用eventBus传递事件
      eventBus.$emit('changeCollapse') // 触发一个事件
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
      // 根据接口文档 请求成功返回的数据在res的data的data中
      // 成功后需将获取到的数据给当前实例的数据对象 用来更新页面
        this.userInfo = res.data
      })
    },
    // 点击用户信息底下的菜单
    clickMenu (command) {
      if (command === 'info') {
        this.$router.push('/home/userInfo')
      } else if (command === 'git') {
        // 跳转到git地址 跨项目跳转用window.location
        window.location.href = 'https://github.com/shuiruohanyu/90heimatoutiao'
      } else {
        // 退出 删除令牌 回到登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    }

  },
  // 一进入页面就进行查询 so在Vue实例创建之后（即用created钩子函数） 发送请求
  created () {
    this.getUserInfo()
    // 实例创建完成 就开始监听
    eventBus.$on('updateUserInfo', () => {
      // 认为别人更新了数据 自己也应该更新
      this.getUserInfo()
    })
  }
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
                width: 40px;
                height: 40px;
                margin: 0 10px;
                border-radius: 50%;
            }
        }
    }
</style>
