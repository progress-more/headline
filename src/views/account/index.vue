<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">账户信息</template>
      </bread-crumb>
      <el-row>
          <el-col :span='12'>
              <el-form label-width='100px'>
                <el-form-item label='用户名'>
                    <el-input style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='简介'>
                    <el-input style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='邮箱'>
                    <el-input style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label='手机号'>
                    <el-input disabled style="width:50%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary'>保存信息</el-button>
                </el-form-item>
              </el-form>
          </el-col>
          <el-col :span='12'>
              <el-upload class="head-upload" action='' :show-file-list='false' :http-request='uploadImg'>
                  <img src="../../assets/img/timg.jpg" alt="">
              </el-upload>
          </el-col>
      </el-row>
  </el-card>
</template>

<script>
export default {

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
