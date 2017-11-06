<template>
  <div ref='chart' :style="style">
  </div>
</template>

<script>
import echarts from '@/plugins/echarts.js'
export default {
  props: {
    name: { default: '未命名图表' },
    data: { default: () => [] },
    ready: { default: false },
    colorTitle: { default: '#FFF' },
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
      chart: null,
      option: {
        title: {
          text: this.name,
          x: 'center',
          top: 5,
          textStyle: {
            fontSize: 16,
            color: this.colorTitle
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '',
          boundaryGap: false,
          min: 'dataMin',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        series: [{
          name: '',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 7,
          showSymbol: true,
          lineStyle: {
            normal: {
              color: 'rgba(8, 237, 234, 1)',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(18, 124, 122, 0.8)'
              }, {
                offset: 1,
                color: 'rgba(23, 49, 86, 0.8)'
              }], false)
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(8, 237, 234, 1)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12
            }
          },
          data: []
        }]
      }
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
        // console.log(`map/china/simple [${this.name}] [watch: ready is ${value}]`)
        this.init()
      }
    },
    size (value) {
      // console.log(`pie/type1 [${this.name}] [组件尺寸变化 ${value.height}*${value.width}]`)
      if (this.chart === null) {
        return
      }
      this.dispose()
      this.init()
    },
    name (value) {
      // console.log(`pie/type1 [${this.name}] [name变化 ${this.name}]`)
      if (this.chart === null) {
        return
      }
      this.refresh()
    },
    data (value, oldValue) {
      // console.log(`pie/type1 [${this.name}] [检测到了数据更新]`)
      this.refresh()
    }
  },
  mounted () {
    // console.log(`pie/type1 [${this.name}] [mounted]`)
  },
  methods: {
    dispose () {
      // 销毁
      this.chart.dispose()
      // console.log(`pie/type1 [${this.name}] [实例销毁]`)
    },
    init () {
      // 初始化
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        this.option.title.text = this.name
        this.option.xAxis.data = this.data.x
        this.option.series[0].data = this.data.number
        this.chart.setOption(this.option)
        // console.log(`pie/type1 [${this.name}] [图表实例化完毕]`)
      })
    },
    refresh () {
      // 更新
      this.$nextTick(() => {
        this.option.title.text = this.name
        this.option.xAxis.data = this.data.x
        this.option.series[0].data = this.data.number
        this.chart.setOption(this.option)
      })
    }
  }
}
</script>
