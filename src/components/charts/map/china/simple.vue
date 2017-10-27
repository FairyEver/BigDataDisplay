<template>
  <div ref='chart' :style="style"></div>
</template>

<script>
import echarts from '@/plugins/echarts.js'
export default {
  props: {
    name: { default: '未命名图表' },
    data: { default: () => [] },
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
      chart: null,
      option: {
        title: {
          text: '全国数据',
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        dataRange: {
          show: false,
          color: [
            'rgba(104,232,218,0.7)',
            'rgba(104,232,218,0.6)',
            'rgba(104,232,218,0.5)',
            'rgba(104,232,218,0.4)',
            'rgba(104,232,218,0.3)',
            'rgba(104,232,218,0.2)',
            'rgba(104,232,218,0.1)'
          ]
        },
        toolbox: {
          show: false
        },
        roamController: {
          show: true,
          x: 'right',
          mapTypeControl: {
            'china': true
          }
        },
        series: [
          {
            name: 'Number',
            type: 'map',
            mapType: 'china',
            roam: false,
            itemStyle: {
              normal: {
                areaColor: 'rgba(0,0,0,0)',
                label: {
                  show: false
                },
                borderWidth: 1,
                borderColor: '#1E6591'
              },
              emphasis: {
                label: {
                  show: true
                },
                areaColor: '#52D7E9',
                borderWidth: 1,
                borderColor: '#52D7E9'
              }
            },
            data: []
          }
        ]
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
        console.log(`map/china/simple [${this.name}] [watch: ready is ${value}]`)
        this.init()
      }
    },
    size (value) {
      if (!this.ready) {
        return
      }
      if (this.chart === null) {
        return
      }
      console.log(`map/china/simple [${this.name}] [组件尺寸变化 ${value.height}*${value.width}]`)
      this.dispose()
      this.init()
    },
    data (value, oldValue) {
      console.log(`map/china/simple [${this.name}] [检测到了数据更新]`)
      this.refresh()
    }
  },
  mounted () {
    console.log(`map/china/simple [${this.name}] [mounted]`)
  },
  methods: {
    dispose () {
      // 销毁
      this.chart.dispose()
      console.log(`map/china/simple [${this.name}] [实例销毁]`)
    },
    init () {
      // 初始化
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        this.option.series[0].data = this.data
        this.chart.setOption(this.option)
        let _this = this
        this.chart.on('click', function (params) {
          _this.$emit('check', params)
        })
        console.log(`map/china/simple [${this.name}] [图表实例化完毕]`)
      })
    },
    refresh () {
      // 更新
      this.$nextTick(() => {
        this.option.series[0].data = this.data
        this.chart.setOption(this.option)
      })
    }
  }
}
</script>
