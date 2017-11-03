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
    },
    // 默认向外提交的模拟用户选择了哪个地区 这个地区如果没有 就从数据中取第一个
    defaultActiveName: { default: '河北' },
    // 自动播放相关
    autoPlay: { default: false },
    autoPlayTimeSpace: { default: 3000 },
    // 可以使用的地区 除了这几个地区 其它的都不能点 不能激活
    ableSpace: {
      default: () => {
        return [
          '河北',
          '山东',
          '辽宁',
          '江苏',
          '湖北'
        ]
      }
    }
  },
  data () {
    return {
      // 自动播放相关
      autoPlayTimer: null,
      // 现在选中的区域名称和index
      selectedMap: '',
      activeCount: 0,
      // 图表设置
      chart: null,
      option: {
        // title: {
        //   text: '全国数据',
        //   x: 'center',
        //   top: 60,
        //   textStyle: {
        //     color: '#FEE032',
        //     fontSize: 24
        //   }
        // },
        // tooltip: {
        //   show: false
        //   // trigger: 'item',
        //   // formatter: '{c0}'
        // },
        // legend: {
        //   orient: 'vertical',
        //   y: 'bottom',
        //   x: 'right',
        //   data: ['蛋价区域'],
        //   textStyle: {
        //     color: '#2DB1FF'
        //   }
        // },
        // visualMap: {
        //   type: 'continuous',
        //   show: false,
        //   min: 0,
        //   max: 10000,
        //   itemWidth: 8,
        //   itemHeight: 50,
        //   color: ['#1EB2BD', '#134C55'],
        //   text: [],
        //   textStyle: {
        //     color: '#2DB1FF'
        //   }
        // },
        // toolbox: {
        //   show: false
        // },
        // roamController: {
        //   show: true,
        //   x: 'right',
        //   mapTypeControl: {
        //     'china': true
        //   }
        // },
        title: {
          text: '',
          x: 'center',
          textStyle: {
            color: '#FEE032',
            fontSize: 24
          }
        },
        tooltip: {
          show: false,
          trigger: 'item'
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#134C55',
              borderColor: '#11CDD9',
              borderWidth: 2
            },
            emphasis: {
              areaColor: '#FFCF2D'
            }
          }
        },
        series: [
          {
            // name: 'map',
            // type: 'map',
            // symbolSize: function (val) {
            //   return val[2] / 10
            // },
            // mapType: 'china',
            // roam: false,
            // label: {
            //   normal: {
            //     formatter: '{b}',
            //     position: 'right',
            //     show: false
            //   },
            //   emphasis: {
            //     show: true
            //   }
            // },
            // left: 50,
            // right: 50,
            // itemStyle: {
            //   normal: {
            //     color: '#f4e925',
            //     areaColor: 'rgba(0,0,0,0)',
            //     label: {
            //       show: false
            //     },
            //     borderWidth: 2,
            //     borderColor: '#11CDD9'
            //   },
            //   emphasis: {
            //     label: {
            //       show: true,
            //       position: ['50%', '50%'],
            //       fontSize: 16,
            //       color: '#52D7E9',
            //       backgroundColor: 'rgba(0,0,0,.7)',
            //       padding: [4, 6],
            //       borderRadius: 2
            //     },
            //     areaColor: '#FFCF2D',
            //     borderWidth: 2,
            //     borderColor: '#FF8D23',
            //     shadowColor: 'rgba(0, 0, 0, 0.4)',
            //     shadowBlur: 20,
            //     shadowOffsetY: 4
            //   }
            // },
            name: '行情数据',
            type: 'scatter',
            // type: 'effectScatter',
            coordinateSystem: 'geo',
            // symbolSize: function (val) {
            //   return val[2] / 4
            // },
            symbolSize: 7,
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925'
              }
            },
            data: [
              {
                name: '海门',
                value: [121.15, 31.89, 9]
              },
              {
                name: '鄂尔多斯',
                value: [109.781327, 39.608266, 12]
              },
              {
                name: '招远',
                value: [120.38, 37.35, 12]
              },
              {
                name: '舟山',
                value: [122.207216, 29.985295, 12]
              },
              {
                name: '齐齐哈尔',
                value: [123.97, 47.33, 14]
              },
              {
                name: '盐城',
                value: [120.13, 33.38, 15]
              },
              {
                name: '赤峰',
                value: [118.87, 42.28, 16]
              },
              {
                name: '青岛',
                value: [120.33, 36.07, 18]
              },
              {
                name: '乳山',
                value: [121.52, 36.89, 18]
              },
              {
                name: '金昌',
                value: [102.188043, 38.520089, 19]
              },
              {
                name: '泉州',
                value: [118.58, 24.93, 21]
              },
              {
                name: '莱西',
                value: [120.53, 36.86, 21]
              },
              {
                name: '日照',
                value: [119.46, 35.42, 21]
              },
              {
                name: '胶南',
                value: [119.97, 35.88, 22]
              },
              {
                name: '南通',
                value: [121.05, 32.08, 23]
              },
              {
                name: '拉萨',
                value: [91.11, 29.97, 24]
              },
              {
                name: '云浮',
                value: [112.02, 22.93, 24]
              },
              {
                name: '梅州',
                value: [116.1, 24.55, 25]
              },
              {
                name: '文登',
                value: [122.05, 37.2, 25]
              },
              {
                name: '上海',
                value: [121.48, 31.22, 25]
              },
              {
                name: '攀枝花',
                value: [101.718637, 26.582347, 25]
              },
              {
                name: '威海',
                value: [122.1, 37.5, 25]
              },
              {
                name: '承德',
                value: [117.93, 40.97, 25]
              },
              {
                name: '厦门',
                value: [118.1, 24.46, 26]
              },
              {
                name: '汕尾',
                value: [115.375279, 22.786211, 26]
              },
              {
                name: '潮州',
                value: [116.63, 23.68, 26]
              },
              {
                name: '丹东',
                value: [124.37, 40.13, 27]
              },
              {
                name: '太仓',
                value: [121.1, 31.45, 27]
              },
              {
                name: '曲靖',
                value: [103.79, 25.51, 27]
              },
              {
                name: '烟台',
                value: [121.39, 37.52, 28]
              },
              {
                name: '福州',
                value: [119.3, 26.08, 29]
              },
              {
                name: '瓦房店',
                value: [121.979603, 39.627114, 30]
              }
            ]
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
    },
    autoPlay (value) {
      console.log(`map/china/simple [${this.name}] [监听到了autoPlay变化为${value}]`)
      // 监视这个值实现控制自动播放
      if (value) {
        this.playStart()
      } else {
        this.playStop()
      }
    },
    selectedMap (value, oldValue) {
      // 监视这个值实现激活新的区域 取消激活旧的区域
      if (value) {
        this.activeMap(value)
      }
      if (oldValue) {
        this.unActiveMap(oldValue)
      }
    }
  },
  mounted () {
    console.log(`map/china/simple [${this.name}] [mounted]`)
  },
  methods: {
    inArray (arr, obj) {
      // 返回是否在指定的数组中出现
      var i = arr.length
      while (i--) {
        if (arr[i] === obj) {
          return true
        }
      }
      return false
    },
    playStart () {
      // 开始自动播放
      if (this.autoPlayTimer === null) {
        console.log(`map/china/simple [${this.name}] [playStart]`)
        this.autoPlayTimer = setInterval(() => {
          this.playCount()
        }, this.autoPlayTimeSpace)
      }
    },
    playStop () {
      // 停止自动播放
      if (this.autoPlayTimer !== null) {
        console.log(`map/china/simple [${this.name}] [playStop]`)
        clearInterval(this.autoPlayTimer)
        // 还原数据
        this.autoPlayTimer = null
        this.activeCount = 0
        this.selectedMap = ''
        // 取消激活最后一项
        this.unActiveMap(this.selectedMap)
        // 向外更新autoPlay设置
        this.$emit('update:autoPlay', false)
      }
    },
    playCount () {
      // 自动播放的每一步
      if (this.activeCount >= this.ableSpace.length) {
        this.playStop()
        this.$emit('playRound')
      } else {
        // 更新激活的区域
        // 在所有的数据中循环
        // this.selectedMap = this.data[this.activeCount].name
        // 只在允许的数据中循环
        this.selectedMap = this.ableSpace[this.activeCount]
        this.activeCount += 1
      }
    },
    activeMap (name, emit = true) {
      this.selectedMap = name
      // 激活某个地区
      this.chart.dispatchAction({
        type: 'mapSelect',
        name: name
      })
      if (emit) {
        // 默认是会发生一次向外提交事件 改变第二个参数来禁用
        this.emit(name)
      }
    },
    unActiveMap (name) {
      // 取消激活某个地区
      this.chart.dispatchAction({
        type: 'mapUnSelect',
        name: name
      })
    },
    dispose () {
      // 销毁
      this.chart.dispose()
      console.log(`map/china/simple [${this.name}] [实例销毁]`)
    },
    init () {
      // 初始化
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs.chart)
        // 更新设置
        let allCount = 0
        this.data.forEach(e => {
          allCount = allCount + Number(e.value)
        })
        this.option.title.text = ''
        // this.option.series[0].data = this.data
        // 重新设置图表
        this.chart.setOption(this.option)
        let _this = this
        this.chart.on('click', function (params) {
          // 检查是否在允许的区域中
          if (_this.inArray(_this.ableSpace, params.data.name)) {
            // 检查是否在自动播放
            if (_this.autoPlayTimer !== null) {
              _this.playStop()
            }
            // 激活这块地图
            _this.selectedMap = params.data.name
          }
        })
        this.activeMap(this.defaultActiveName)
        console.log(`map/china/simple [${this.name}] [图表实例化完毕]`)
      })
    },
    refresh () {
      // 更新
      this.$nextTick(() => {
        // 更新设置
        let allCount = 0
        this.data.forEach(e => {
          allCount = allCount + Number(e.value)
        })
        this.option.title.text = '全国存栏 约' + Math.round(allCount) + '万只'
        // this.option.series[0].data = this.data
        // 重新设置图表
        this.chart.setOption(this.option)
        this.activeMap(this.selectedMap)
        if (this.autoPlay) {
          this.playStart()
        }
      })
    },
    emit (name) {
      // 这个方法会向外提交模拟点击了某个区域的数据
      // 定义到底是哪个地区
      let filterName
      if (name) {
        filterName = name
      } else {
        filterName = this.defaultActiveName
      }
      // 筛选数据
      let data = this.data.filter(e => e.name === filterName)
      if (data.length === 0) {
        data = [this.data[0]]
      }
      // 提交事件
      this.$emit('check', {
        data: {
          ...data[0]
        }
      })
    }
  }
}
</script>
