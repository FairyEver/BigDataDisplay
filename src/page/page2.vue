<template>
  <layout
    :auto-play.sync="autoPlay"
    :nav="nav"
    :nav-active.sync="navActive"
    :offset-size.sync="offsetSize"
    :layout-ready.sync="layoutReady"
    :h-item-l1="280"
    :h-item-r1="280">

    <template slot="title">智慧蛋鸡行业大数据展示</template>

    <template slot="l1">
      <bar
        name="全国养殖户户数TOP10"
        :ready="layoutReady"
        :size="offsetSize.l1"
        :data="dataTop10"
        :color-title="colorTitle">
      </bar>
    </template>
    <template slot="l2">
      <bar-col
        name="全国养殖户年龄分布"
        :ready="layoutReady"
        :size="offsetSize.l2"
        :data="dataL2"
        :color-title="colorTitle">
      </bar-col>
    </template>
    <template slot="l3">
      <pie
        name="全国养殖户从业年限分布"
        :ready="layoutReady"
        :size="offsetSize.l3"
        :data="dataL3"
        :color-title="colorTitle">
      </pie>
    </template>

    <template slot="c1">
      <map-x
        :name="mapTitle"
        :ready="layoutReady"
        :size="offsetSize.c1"
        :data="dataMapFilted"
        :auto-play.sync="autoPlay"
        @check="mapClick"
        @playRound="mapPlayRound">
      </map-x>
    </template>
    <template slot="c2">
      <number-x
        :type="2"
        :data="mapInfo"
        :size="offsetSize.c2">
      </number-x>
    </template>

    <template slot="r1">
      <cunlan-info
        :type="2"
        :name="rName + '养殖户'"
        :ready="layoutReady"
        :size="offsetSize.r1"
        :value="r1Value"
        :info="r1Info"
        :map="pieceMapFilted"
        :province="rName"
        :color-title="colorTitle"
        :dw="'户'">
      </cunlan-info>
    </template>
    <template slot="r2">
      <bar-col
        :name="rName + '养殖户年龄分布'"
        :ready="layoutReady"
        :size="offsetSize.r2"
        :data="r2Data"
        :color-title="colorTitle">
      </bar-col>
    </template>
    <template slot="r3">
      <pie
        :name="rName + '养殖户从业年限分布'"
        :ready="layoutReady"
        :size="offsetSize.r3"
        :data="r3Data"
        :color-title="colorTitle">
      </pie>
    </template>

  </layout>
</template>

<script>
// [组件] 主布局
import layout from '@/components/layout/2/index.vue'
import mapX from '@/components/charts/map/china/simple.vue'
import numberX from '@/components/number/index.vue'
import bar from '@/components/charts/bar/row.vue'
import barCol from '@/components/charts/bar/col.vue'
import pie from '@/components/charts/pie/type1.vue'
import cunlanInfo from '@/components/component/cunlan/cunlan.vue'

// 下面是新的数据
import keHuChina from '@/data/new/page2/全国客户.js'
import keHuPiece from '@/data/new/page2/地区客户.js'
import nianLing from '@/data/new/page2/年龄分布.js'
import congYe from '@/data/new/page2/从业年限.js'

export default {
  components: {
    layout,
    mapX,
    numberX,
    bar,
    barCol,
    pie,
    cunlanInfo
  },
  data () {
    return {
      // 新版数据
      keHuChina,
      keHuPiece,
      nianLing,
      congYe,
      // 自动播放
      autoPlay: false,
      // 布局尺寸
      offsetSize: {},
      layoutReady: false,
      // 颜色设置
      colorTitle: '#55EDDC',
      // 导航栏
      navActive: 'page2',
      nav: [
        { label: '蛋鸡存栏', value: 'page1' },
        { label: '养殖户分布', value: 'page2' },
        { label: '行情数据', value: 'page3' }
      ],
      // 右侧有所卡片共享的地区名称
      rName: '',
      // 每个地区的详细数据 r1
      r1Info: {
        hong: 0,
        fen: 0,
        bai: 0
      },
      r1Value: 0
    }
  },
  computed: {
    dataL3 () {
      // 全国从业年限分布
      return [
        {name: '2年以下', value: this.counter('congYe', '2')},
        {name: '2-5年', value: this.counter('congYe', '2-5')},
        {name: '5-10年', value: this.counter('congYe', '5-10')},
        {name: '10-15年', value: this.counter('congYe', '10-15')},
        {name: '15年以上', value: this.counter('congYe', '15')}
      ]
    },
    dataL2 () {
      // 全国年龄分布
      return [
        {name: '30岁以下', value: this.counter('nianLing', '30')},
        {name: '30-40岁', value: this.counter('nianLing', '30-40')},
        {name: '40-50岁', value: this.counter('nianLing', '40-50')},
        {name: '50-60岁', value: this.counter('nianLing', '50-60')},
        {name: '60岁以上', value: this.counter('nianLing', '60')}
      ]
    },
    dataTop10 () {
      return this.keHuChina.sort((a, b) => Number(a.all) - Number(b.all)).slice(-10).map(e => ({name: e.name, value: e.all}))
    },
    pieceMapFilted () {
      // r1 地图数据
      if (this.rName) {
        let data = this.keHuPiece.find(e => e.name === this.rName)
        return data.value
      } else {
        return []
      }
    },
    dataMapFilted () {
      // 地图数据 这个计算属性会传递给地图
      return this.keHuChina.map(e => {
        return {
          name: e.name,
          value: e.all
        }
      })
    },
    mapInfo () {
      // 传递给中间下部分 红壳蛋鸡，白壳蛋鸡，粉壳蛋鸡和其他蛋鸡的养殖户占总养殖户百分比
      let all = this.counter('keHuChina', 'all')
      let hong = Math.round(this.counter('keHuChina', 'hong') / all * 100)
      let bai = Math.round(this.counter('keHuChina', 'bai') / all * 100)
      return [
        { label: '红壳蛋鸡养殖户', value: hong },
        { label: '粉壳蛋鸡养殖户', value: 100 - hong - bai },
        { label: '白壳蛋鸡养殖户', value: bai }
      ]
    },
    // 地图的标题
    mapTitle () {
      let data = this.counter('keHuChina', 'all')
      return '全国养殖户 ' + this.$root.qian(data) + ' 户'
    },
    r2Data () {
      // r2数据 养殖户年龄分布
      if (this.rName) {
        let data = this.nianLing.find(e => e.name === this.rName)
        return [
          {name: '30岁以下', value: data['30']},
          {name: '30-40岁', value: data['30-40']},
          {name: '40-50岁', value: data['40-50']},
          {name: '50-60岁', value: data['50-60']},
          {name: '60岁以上', value: data['60']}
        ]
      } else {
        return []
      }
    },
    r3Data () {
      // r3数据 养殖户从业年限分布
      if (this.rName) {
        let data = this.congYe.find(e => e.name === this.rName)
        return [
          {name: '2年以下', value: data['2']},
          {name: '2-5年', value: data['2-5']},
          {name: '5-10年', value: data['5-10']},
          {name: '10-15年', value: data['10-15']},
          {name: '15年以上', value: data['15']}
        ]
      } else {
        return []
      }
    }
  },
  watch: {
    navActive (value) {
      // 监视导航的值切换路由
      this.$router.push({
        name: value
      })
    }
  },
  mounted () {
    if (this.$route.params.autoPlay) {
      this.autoPlay = true
    }
  },
  methods: {
    counter (arrName, keyName) {
      // 工具方法 传递数组名和key值 返回累加和
      let temp = 0
      this[arrName].forEach(e => { temp += Number(e[keyName]) })
      return temp
    },
    refreshR1Data (value) {
      // 更新r1相关的数据
      this.r1Value = value
      let data = this.keHuChina.find(e => e.name === this.rName)
      let hong = Number(data.hong)
      let fen = Number(data.fen)
      let bai = Number(data.bai)
      let all = hong + fen + bai
      let _hong = Math.round(hong / all * 100)
      let _fen = Math.round(fen / all * 100)
      let _bai = 100 - _hong - _fen
      let res = {
        hong: _hong,
        fen: _fen,
        bai: _bai
      }
      this.r1Info = res
    },
    mapClick (params) {
      // 更新地图下面的数据
      if (params.data) {
        let data = params.data
        // r
        this.rName = data.name
        // r1
        this.refreshR1Data(data.value)
      } else {
        // r
        this.rName = ''
        // r1
        this.r1Info = {
          hong: 0,
          bai: 0,
          fen: 0
        }
        this.r1Value = 0
      }
    },
    mapPlayRound () {
      // 地图播放了一遍
      console.log('地图播放完了一圈')
      console.log('autoPlay = ' + this.autoPlay)
      console.log('跳转页面到page1')
      this.$router.push({
        name: 'page1',
        params: {
          autoPlay: true
        }
      })
    }
  }
}
</script>
