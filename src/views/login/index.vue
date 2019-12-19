<template>
    <div class="login">
        <!-- 放置一个el-card组件 将信息聚合显示 -->
        <el-card class="login-card">
            <!-- 设置标题 放入图片 -->
            <div class="title">
                <img src="../../assets/img/logo_index.png" alt="">
            </div>
            <!-- 放置表单 -->
            <el-form>
                <!--在form组件中 每个表单域由一个form-item组件构成，表单域里边 放置 input，select，CheckBox 相当于一行 -->
                <el-form-item>
                    <el-input placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="width:65%" placeholder='验证码'></el-input>
                     <el-button plain style="float:right">发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                     <el-checkbox >我已阅读并同意<a style="color:blue;">用户协议</a>和<a style="color:blue;">隐私条款</a></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {

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
