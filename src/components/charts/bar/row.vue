<template>
  <div ref="chart" :style="style"></div>
</template>

<script>
import echarts from '@/plugins/echarts.js'
export default {
  name: 'HelloWorld',
  props: {
    name: { default: '未命名图表' },
    data: { default: () => {} },
    ready: { default: false },
    size: {
      default: () => {
        return {
          height: 0,
          width: 0
        }
      }
    }
  },
  data () {
    return {
      chart: null
    }
  },
  computed: {
    style () {
      return {
        height: this.size.height + 'px',
        width: this.size.width + 'px'
      }
    }
  },
  watch: {
    ready (value) {
      if (value) {
        console.log(`bar/row [${this.name}] [ready]`)
        this.init()
      }
    },
    size (value) {
      console.log(`bar/row [${this.name}] [组件尺寸变化 ${value.height}*${value.width}]`)
      if (this.chart === null) {
        return
      }
      this.dispose()
      this.init()
    }
  },
  mounted () {
    console.log(`bar/row [${this.name}] [等待尺寸数据 ...]`)
  },
  methods: {
    dispose () {
      // 销毁
      this.chart.dispose()
      console.log(`bar/row [${this.name}] [实例销毁]`)
    },
    init () {
      let option = {
        tooltip: {
          formatter: '{b} ({c})'
        },
        xAxis: [
          {
            gridIndex: 0,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [{
          gridIndex: 0,
          interval: 0,
          data: this.data.yAxisData,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '8px',
              color: '#36a8fa'
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }

        }],
        series: [
          {
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: '50%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: '#52D7E9'
                },
                {
                  offset: 0.8,
                  color: '#51F0E0'
                }], false)
              }
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                textStyle: {
                  color: '#6385EE'
                }
              }
            },
            data: this.data.data
          }
        ]
      }
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        this.chart.setOption(option)
        console.log(`bar/row [${this.name}] [图表实例化完毕]`)
      })
    }
  }
}
</script>
