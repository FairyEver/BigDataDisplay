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

    <template slot="title">行情大数据展示</template>

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
        :name="rName + '蛋鸡存栏: ' + r1Value + ' 只'"
        :ready="layoutReady"
        :size="offsetSize.c1"
        :data="dataMapFilted"
        :auto-play.sync="autoPlay"
        @check="mapClick"
        @playRound="mapPlayRound">
      </map-x>
    </template>
    <template slot="c2">
      <number-x :data="mapInfo"></number-x>
    </template>

    <template slot="r1">
      <cunlan-info
        :name="rName + rType + '存栏量'"
        :ready="layoutReady"
        :size="offsetSize.r1"
        :value="r1Value"
        :info="r1Info"
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
import pinZhong from '@/data/new/page1/全国品种.js'
import cunLan from '@/data/new/page1/全国存栏区间.js'
import cunLanInfoChina from '@/data/new/page1/每种存栏的四项数据_全国.js'

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
      pinZhong,
      cunLan,
      cunLanInfoChina,
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
      r1Value: 0,
      // 每个地区的存栏区间分布 r2
      r2Data: [
        // {name: 'A', value: '12320'},
        // {name: 'B', value: '34512'},
        // {name: 'C', value: '23482'},
        // {name: 'D', value: '23789'}
      ],
      // 品种占比 r3
      r3Data: [
        // {name: 'A', value: '12320'},
        // {name: 'B', value: '34512'},
        // {name: 'C', value: '23482'},
        // {name: 'D', value: '23789'}
      ]
    }
  },
  computed: {
    dataMapFilted () {
      // 地图数据 这个计算属性会传递给地图
      return this.pinZhong.map(e => {
        return {
          name: e.name,
          value: e.all
        }
      })
    },
    mapInfo () {
      // 产蛋 日耗料 淘汰鸡 疫苗 传递给中间下部分 根据地图右侧的控制器切换
      let data = this.cunLanInfoChina.filter(e => e.name === this.dataNavActive)[0]
      return [
        { label: '产蛋量', value: data.cd },
        { label: '日耗料', value: data.hl },
        { label: '淘汰鸡', value: data.tt },
        { label: '疫苗', value: data.ym }
      ]
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
    mapClick (params) {
      // 更新地图下面的数据
      if (params.data) {
        let data = params.data
        // r
        this.rName = data.name
        // r1
        this.r1Info = data.r1
        this.r1Value = data.value
        // r2
        this.r2Data = data.r2
        // r3
        this.r3Data = data.r3
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
        // r2
        this.r2Data = []
        // r3
        this.r3Data = []
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
