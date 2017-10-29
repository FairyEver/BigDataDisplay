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
    autoPlayTimeSpace: { default: 1000 }
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
        title: {
          text: '全国数据',
          x: 'center',
          top: 60,
          textStyle: {
            color: '#FEE032',
            fontSize: 24
          }
        },
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false,
          min: 0,
          max: 10000,
          color: ['#2DB1FF', '#002330']
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
            // top: 0,
            // bottom: 0,
            left: 50,
            right: 50,
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
                  show: true,
                  position: ['50%', '50%'],
                  fontSize: 16,
                  color: '#52D7E9',
                  backgroundColor: 'rgba(0,0,0,.7)',
                  padding: [4, 6],
                  borderRadius: 2
                },
                areaColor: '#78F7FF',
                borderWidth: 1,
                borderColor: '#0C1019',
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                shadowBlur: 20,
                shadowOffsetY: 4
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
    },
    name () {
      this.refreshTitle()
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
      if (this.activeCount >= this.data.length) {
        this.playStop()
        this.$emit('playRound')
      } else {
        // 更新激活的区域
        this.selectedMap = this.data[this.activeCount].name
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
        this.option.title.text = this.name
        this.option.series[0].data = this.data
        // 重新设置图表
        this.chart.setOption(this.option)
        let _this = this
        this.chart.on('click', function (params) {
          // 检查是否在自动播放
          if (_this.autoPlayTimer !== null) {
            _this.playStop()
          }
          // 激活这块地图
          _this.selectedMap = params.data.name
        })
        this.activeMap(this.defaultActiveName)
        console.log(`map/china/simple [${this.name}] [图表实例化完毕]`)
      })
    },
    refresh () {
      // 更新
      this.$nextTick(() => {
        // 更新设置
        this.option.title.text = this.name
        this.option.series[0].data = this.data
        // 重新设置图表
        this.chart.setOption(this.option)
        this.emit()
        if (this.autoPlay) {
          this.playStart()
        }
      })
    },
    refreshTitle () {
      // 这个方法只适用于标题改变
      this.$nextTick(() => {
        // 更新设置
        this.option.title.text = this.name
        // 重新设置图表
        this.chart.setOption(this.option)
        // 如果之前有激活的区域 再次将这个区域激活 但是这个激活不会再向外发送事件
        if (this.selectedMap) {
          this.activeMap(this.selectedMap, false)
        }
      })
    },
    emit (name) {
      // 这个方法会向外提交模拟点击了某个区域的数据
      // 查找数据
      let filterName
      if (name) {
        filterName = name
      } else {
        filterName = this.defaultActiveName
      }
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
