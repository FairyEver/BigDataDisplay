<template>
  <layout
    :auto-play.sync="autoPlay"
    :nav="nav"
    :nav-active.sync="navActive"
    :data-nav="dataNav"
    :data-nav-active.sync="dataNavActive"
    :offset-size.sync="offsetSize"
    :layout-ready.sync="layoutReady"
    :h-item-l1="280"
    :h-item-r1="280">

    <template slot="title">智慧蛋鸡行业大数据展示</template>

    <template slot="l1">
      <bar
        name="全国存栏量"
        :ready="layoutReady"
        :size="offsetSize.l1"
        :data="dataTop10"
        :color-title="colorTitle">
      </bar>
    </template>
    <template slot="l2">
      <pie
        name="全国存栏区间分布"
        :ready="layoutReady"
        :size="offsetSize.l2"
        :data="cunLanFenBu"
        :color-title="colorTitle">
      </pie>
    </template>
    <template slot="l3">
      <pie
        name="全国品种占比"
        :ready="layoutReady"
        :size="offsetSize.l3"
        :data="pinZhongZhanBi"
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
        :data="mapInfo"
        :size="offsetSize.c2">
      </number-x>
    </template>

    <template slot="r1">
      <cunlan-info
        :name="rName + rType + '存栏'"
        :ready="layoutReady"
        :size="offsetSize.r1"
        :value="r1Value"
        :info="r1Info"
        :map="pieceMapFilted"
        :province="rName"
        :color-title="colorTitle">
      </cunlan-info>
    </template>
    <template slot="r2">
      <pie
        :name="rName + '存栏区间分布'"
        :ready="layoutReady"
        :size="offsetSize.r2"
        :data="r2Data"
        :color-title="colorTitle">
      </pie>
    </template>
    <template slot="r3">
      <pie
        :name="rName + '蛋鸡品种占比'"
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
import pie from '@/components/charts/pie/type1.vue'
import cunlanInfo from '@/components/component/cunlan/cunlan.vue'

// 数据
import dataMap from '@/data/old/page1/地图数据.js'
import dataTop10 from '@/data/old/page1/全国存栏量.js'
import cunLanFenBu from '@/data/old/page1/全国存栏区间分布.js'
import pinZhongZhanBi from '@/data/old/page1/全国品种占比.js'

// 下面是新的数据
import pinZhongChina from '@/data/new/page1/全国品种.js'
import pinZhongPiece from '@/data/new/page1/地区品种.js'
import cunLan from '@/data/new/page1/全国存栏区间.js'
import cunLanInfoChina from '@/data/new/page1/每种存栏的四项数据_全国.js'
import cunLanInfoPiece from '@/data/new/page1/每种存栏的四项数据_地区.js'

export default {
  components: {
    layout,
    mapX,
    numberX,
    bar,
    pie,
    cunlanInfo
  },
  data () {
    return {
      // 新版数据
      pinZhongChina,
      pinZhongPiece,
      cunLan,
      cunLanInfoChina,
      cunLanInfoPiece,
      // 自动播放
      autoPlay: false,
      // 布局尺寸
      offsetSize: {},
      layoutReady: false,
      // 颜色设置
      colorTitle: '#55EDDC',
      // 导航栏
      navActive: 'page1',
      nav: [
        { label: '蛋鸡存栏', value: 'page1' },
        { label: '养殖户分布', value: 'page2' }
      ],
      // 数据导航栏
      dataNavActive: 'all',
      dataNav: [
        { label: '全部', value: 'all' },
        { label: '红壳蛋鸡', value: 'hong' },
        { label: '白壳蛋鸡', value: 'bai' },
        { label: '粉壳蛋鸡', value: 'fen' }
      ],
      // 数据 地图
      dataMap,
      // 数据 top10 l1
      dataTop10,
      // 全国存栏分布 l2
      cunLanFenBu,
      // 全国品种占比 l3
      pinZhongZhanBi,
      // 右侧有所卡片共享的地区名称
      rName: '',
      // 每个地区的详细数据 r1
      r1Info: {
        cd: 0,
        hl: 0,
        tt: 0,
        ym: 0
      },
      r1Value: 0
    }
  },
  computed: {
    pieceMapFilted () {
      // 右上角小地图的数据
      let data = this.pinZhongPiece.filter(e => e.name === this.rName)
      if (data.length > 0) {
        return data[0].value.map(e => {
          return {
            name: e.name,
            value: e[this.dataNavActive]
          }
        })
      } else {
        return []
      }
    },
    dataMapFilted () {
      // 地图数据 这个计算属性会传递给地图
      return this.pinZhongChina.map(e => {
        return {
          name: e.name,
          value: e[this.dataNavActive]
        }
      })
    },
    mapInfo () {
      // 产蛋 日耗料 淘汰鸡 疫苗 传递给中间下部分 根据地图右侧的控制器切换
      let data = this.cunLanInfoChina.filter(e => e.name === this.dataNavActive)[0]
      return [
        { label: '产蛋量', value: data.cd },
        { label: '日耗料', value: data.hl },
        { label: '淘汰鸡', value: data.tt }
      ]
    },
    // 地图的标题
    mapTitle () {
      let data = this.cunLanInfoChina.filter(e => e.name === this.dataNavActive)[0]
      return '存栏' + data.cl + '万只'
    },
    rType () {
      // 右侧有所卡片共享的数据分类 比如'红壳蛋鸡'
      switch (this.dataNavActive) {
        case 'all':
          return '全部品种'
        case 'hong':
          return '红壳蛋鸡'
        case 'bai':
          return '白壳蛋鸡'
        case 'fen':
          return '粉壳蛋鸡'
        default:
          return ''
      }
    },
    r2Data () {
      // r2数据 地区的存栏区间
      let data = cunLan.filter(e => e.name === this.rName)
      if (data.length > 0) {
        return [
          {name: '＜1000', value: data[0]['＜1000']},
          {name: '1000-3000', value: data[0]['1000-3000']},
          {name: '3000-5000', value: data[0]['3000-5000']},
          {name: '5000-10000', value: data[0]['5000-10000']},
          {name: '>10000', value: data[0]['>10000']}
        ]
      } else {
        return []
      }
    },
    r3Data () {
      let data = pinZhongChina.filter(e => e.name === this.rName)
      if (data.length > 0) {
        return [
          {name: '红壳蛋鸡', value: data[0].hong},
          {name: '粉壳蛋鸡', value: data[0].fen},
          {name: '白壳蛋鸡', value: data[0].bai}
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
    },
    dataNavActive (value) {
      // 数据导航的值发生变化
      this.refreshR1Data(this.pinZhongChina.filter(e => e.name === this.rName)[0][value])
    }
  },
  mounted () {
    if (this.$route.params.autoPlay) {
      this.autoPlay = true
    }
  },
  methods: {
    refreshR1Data (value) {
      // 更新r1相关的数据
      let r1Data = this.cunLanInfoPiece.filter(e => (e.name === this.rName) && (e.type === this.dataNavActive))
      this.r1Value = value
      this.r1Info = {
        cd: r1Data[0].cd,
        hl: r1Data[0].hl,
        tt: r1Data[0].tt,
        ym: r1Data[0].ym
      }
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
          cd: 0,
          hl: 0,
          tt: 0,
          ym: 0
        }
        this.r1Value = 0
      }
    },
    mapPlayRound () {
      // 地图播放了一遍
      console.log('地图播放完了一圈')
      console.log('autoPlay = ' + this.autoPlay)
      if (this.dataNavActive === 'all') {
        this.dataNavActive = 'hong'
        this.autoPlay = true
      } else if (this.dataNavActive === 'hong') {
        this.dataNavActive = 'bai'
        this.autoPlay = true
      } else if (this.dataNavActive === 'bai') {
        this.dataNavActive = 'fen'
        this.autoPlay = true
      } else {
        console.log('跳转页面到page2')
        this.$router.push({
          name: 'page2',
          params: {
            autoPlay: true
          }
        })
      }
    }
  }
}
</script>
