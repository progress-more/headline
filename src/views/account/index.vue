<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">账户信息</template>
      </bread-crumb>
      <el-row>
          <el-col :span='12'>
              <el-form label-width='100px'>
                <el-form-item label='用户名'>
                    <el-input v-model="formData.name" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='简介'>
                    <el-input v-model="formData.intro" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='邮箱'>
                    <el-input v-model="formData.email" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='手机号'>
                    <el-input v-model="formData.mobile" disabled style="width:50%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary'>保存信息</el-button>
                </el-form-item>
              </el-form>
          </el-col>
          <el-col :span='12'>
              <el-upload class="head-upload" action='' :show-file-list='false'>
                  <img :src="formData.photo ? formData.photo : defaultImg" alt="">
              </el-upload>
          </el-col>
      </el-row>
  </el-card>
</template>

<script>
// 打开页面 获取用户信息 1.先定义变量接收返回数据 2.请求数据 3.渲染页面
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', //  邮箱
        mobile: '' // 手机号
      },
      defaultImg: require('../../assets/img/timg.jpg')
    }
  },
  methods: {
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scope>
    .el-form {
        margin-left: 100px;
        .el-form-item {
            padding: 12px 0;
        }
    }
        .head-upload {
            margin-top: 40px;
            width: 300px;
            height: 300px;
            img {
                width: 100%;
                height: 100%;
                 border-radius: 50%;
            }
        }
</style>
