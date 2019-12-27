<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">发表文章</template>
      </bread-crumb>
      <el-form label-width='100px'>
        <el-form-item label='标题:'>
            <el-input style="width:300px;" placeholder='文章名称'></el-input>
        </el-form-item>
        <el-form-item label='内容:'>
            <el-input :rows='8' type='textarea'></el-input>
        </el-form-item>
        <el-form-item label='封面:'>
            <el-radio-group>
                <el-radio label='单图'>单图</el-radio>
                <el-radio label='三图'>三图</el-radio>
                <el-radio label='无图'>无图</el-radio>
                <el-radio label='自动'>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label='频道:'>
            <el-select placeholder='请选择'></el-select>
        </el-form-item>
        <el-form-item>
            <el-button type='primary'>发表</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>

</template>

<script>
export default {

}
</script>

<style>

</style>
