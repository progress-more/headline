<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
      <template slot="title">账户信息</template>
      </bread-crumb>
      <el-row>
          <el-col :span='12'>
              <el-form ref="myForm" :model='formData' :rules='rules' label-width='100px'>
                <el-form-item prop='name' label='用户名'>
                    <el-input v-model="formData.name" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='简介'>
                    <el-input v-model="formData.intro" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item prop='email' label='邮箱'>
                    <el-input v-model="formData.email" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='手机号'>
                    <el-input v-model="formData.mobile" disabled style="width:50%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click='saveUserInfo' type='primary'>保存信息</el-button>
                </el-form-item>
              </el-form>
          </el-col>
          <el-col :span='12'>
              <el-upload action='' :show-file-list='false' :http-request='uploadImg'>
                  <img :src="formData.photo ? formData.photo : defaultImg" alt="">
              </el-upload>
          </el-col>
      </el-row>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
// 打开页面 获取用户信息 1.先定义变量接收返回数据 2.请求数据 3.渲染页面
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', //  邮箱
        mobile: '' // 手机号
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名长度在1到7个字符' }],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }]
      },
      defaultImg: require('../../assets/img/timg.jpg')
    }
  },
  methods: {
    // 上传头像
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.loading = false
        // 请求成功后 应用返回的头像地址 替换页面上的头像地址
        this.formData.photo = res.data.photo
        // 认为保存成功 通知header组件 更新信息
        eventBus.$emit('updateUserInfo')
      })
    },
    //   保存用户信息
    saveUserInfo () {
      this.$refs.myForm.validate().then(res => {
        // 若校验成功 请求保存
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
          // 认为保存成功 通知header组件 更新信息
          eventBus.$emit('updateUserInfo')
        })
      })
    },
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
        .el-upload {
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
