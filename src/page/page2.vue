<template>
  <layout
    :auto-play.sync="autoPlay"
    :nav="nav"
    :nav-active.sync="navActive"
    :offset-size.sync="offsetSize"
    :layout-ready.sync="layoutReady"
    :h-item-l1="280"
    :h-item-r1="280">

    <template slot="title">行情大数据展示</template>

    <template slot="l1">
      <bar
        name="养殖户排名"
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
        :data="yangZhiHuNianLingFenBu"
        :color-title="colorTitle">
      </bar-col>
    </template>
    <template slot="l3">
      <pie
        name="全国养殖户学历分布"
        :ready="layoutReady"
        :size="offsetSize.l3"
        :data="yangZhiHuXueLi"
        :color-title="colorTitle">
      </pie>
    </template>

    <template slot="c1">
      <map-x
        :name="rName + '养殖户: ' + r1Value + ' 人'"
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
        :name="rName + '养殖户数据'"
        :size="offsetSize.r1"
        :value="r1Value"
        :info="r1Info"
        :province="rName"
        :color-title="colorTitle">
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
        :name="rName + '养殖户学历分布'" 
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

// 数据
import dataMap from '@/data/page2/地图数据.js'
import dataTop10 from '@/data/page2/养殖户排名.js'
import yangZhiHuNianLingFenBu from '@/data/page2/全国养殖户年龄分布.js'
import yangZhiHuXueLi from '@/data/page2/全国养殖户学历分布.js'

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
        { label: '养殖户分布', value: 'page2' }
      ],
      // 数据 地图
      dataMap,
      // 数据 top10 l1
      dataTop10,
      // 全国存栏分布 l2
      yangZhiHuNianLingFenBu,
      // 全国品种占比 l3
      yangZhiHuXueLi,
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
      // 地图数据
      return this.dataMap.mapData
    },
    mapInfo () {
      // 中间下部分地图信息 根据地图右侧的控制器切换
      let mapInfo = this.dataMap.mapInfo
      return [
        { label: '产蛋量', value: mapInfo.cd },
        { label: '日耗料', value: mapInfo.hl },
        { label: '淘汰鸡', value: mapInfo.tt },
        { label: '疫苗', value: mapInfo.tm }
      ]
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
      // console.log(params)
      // 更新地图下面的数据
      if (params.data) {
        let data = params.data
        // r
        this.rName = data.name
        // r1
        this.r1Info = data.r1
        this.r1Value = data.value
        // r2
        console.log('----')
        this.r2Data = data.r2
        console.log(this.r2Data)
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
