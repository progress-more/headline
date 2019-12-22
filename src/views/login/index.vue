<template>
    <div class="login">
        <!-- 放置一个el-card组件 将信息聚合显示 -->
        <el-card class="login-card">
            <!-- 设置标题 放入图片 -->
            <div class="title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <!-- 放置表单 -->
            <!-- 表单验证功能需1.el-form上设置model属性绑定数据对象；2.el-form上设置rules属性约定验证规则；
            3.并将form-item的prop属性设置为需校验的字段名即可 -->
            <el-form ref="myForm" :model='loginForm' :rules='rules' >
                <!--在form组件中 每个表单域由一个form-item组件构成，表单域里边 放置 input，select，CheckBox 相当于一行 -->
                <el-form-item prop='mobile'>
                    <el-input v-model="loginForm.mobile" placeholder='请输入手机号'></el-input>
                </el-form-item>
                <!-- form-item 设置prop属性 绑定需校验的字段名 -->
                <el-form-item prop='code'>
                    <!-- 双向绑定数据 -->
                    <el-input v-model="loginForm.code" style="width:65%" placeholder='验证码'></el-input>
                     <el-button plain style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item prop='agree'>
                     <el-checkbox v-model="loginForm.agree">我已阅读并同意<a style="color:blue;">用户协议</a>和<a style="color:blue;">隐私条款</a></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <!-- 自动校验 校验单个表单数据；手动校验 提交整个表单时 校验整个表单数据 -->
                    <el-button @click="submitLogin" type='primary' style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
      // 设置数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 是否同意协议
      },
      //   规则对象 key（字段名）：value（对象数组），一个对象就是一个校验规则
      // required 为true 就表示该字段必填 如果不填就会提示消息
      rules: {
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        agree: [{ validator: function (rule, value, callback) {
          // 自定义校验函数
          //   value要校验的字段的值  callback 是一个回调函数
          if (value) {
            // 认为已经勾选
            callback()// 认为当前的校验规则已经通过
          } else {
            callback(new Error('您应该同意协议'))
            //   如果没有勾选 则校验失败 应该停止
          }
        } }]
        // 登录规则集合对象 自定义形式去校验
      }
    }
  },
  methods: {
    submitLogin () {
      //   提交时手动校验整个表单
      // 需获取当前表单DOM元素 即添加ref属性
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // 校验通过，开始调用登录接口
          // 对token令牌进行前端存储 以便后续接口访问使用
        //  axios参数分为 body参数和 get地址参数
        // body参数在axios 的data中
        // get参数在 axios 的params中
          this.$axios({
            url: '/authorizations', // 请求地址 axios 没有指定类型 默认走get类型
            method: 'post', // 类型
            data: this.loginForm// body参数
          }).then(res => {
            console.log(res)
            // 用户信息匹配时
            // 前端缓存 登陆成功返回给我们的令牌 且跳转到主页
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          })
        }
      })
    }

  }

}
</script>

<style lang='less' scoped>
    .login {
        background: url('../../assets/img/bg.jpg');
        // background-image:url('../../assets/img/bg.jpg');
        height: 100vh;
        background-size: cover;
        // 让登录卡片居中
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card {
            width: 450px;
            height: 350px;
            .title {
                text-align: center;
                margin-bottom: 30px;
                img {
                    height: 45px;
                }
            }
        }
    }
</style>
