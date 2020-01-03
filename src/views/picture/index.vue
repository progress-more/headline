<template>
  <el-card>
      <bread-crumb slot='header'>
        <template slot='title'>图文数据</template>
      </bread-crumb>
       <div   ref="myChart" class='echarts'></div>
       <div ref="myChart2" class='echarts'></div>

  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      option2: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      },
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      }

    }
  },
  mounted   () {
    this.myChart = echarts.init(this.$refs.myChart) // 完成图表的初始化
    this.myChart2 = echarts.init(this.$refs.myChart2) // 完成图表的初始化
    this.myChart.setOption(this.option)
    this.myChart2.setOption(this.option2)
    setInterval(() => {
      this.option.series[0].data.map(item => {
        return item * Math.random() * 10
      })
      this.option2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
      this.myChart2.setOption(this.option2, true)
      this.myChart.setOption(this.option, true)
    }, 2000)
  }
}
</script>

<style>
 .echarts {
     width:800px;
     height: 400px;
 }
</style>
