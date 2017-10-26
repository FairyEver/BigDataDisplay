<template>
  <div>
    <pie
      :name="data[0].name"
      :data="data[0].value"
      :ready="ready"
      :size="{height:50,width:50}"
      :color-light="colorLight[0]"
      :color-dark="colorDark[0]">
    </pie>
    <pie
      :name="data[1].name"
      :data="data[1].value"
      :ready="ready"
      :size="{height:50,width:50}"
      :color-light="colorLight[1]"
      :color-dark="colorDark[1]">
    </pie>
    <pie
      :name="data[2].name"
      :data="data[2].value"
      :ready="ready"
      :size="{height:50,width:50}"
      :color-light="colorLight[2]"
      :color-dark="colorDark[2]">
    </pie>
    <pie
      :name="data[3].name"
      :data="data[3].value"
      :ready="ready"
      :size="{height:50,width:50}"
      :color-light="colorLight[3]"
      :color-dark="colorDark[3]">
    </pie>
  </div>
</template>

<script>
import pie from '@/components/charts/pie/type2.vue'
export default {
  components: {
    pie
  },
  props: {
    // 框架基础
    ready: { default: false },
    size: {
      default: () => {
        return {
          height: 0,
          width: 0
        }
      }
    },
    // 本组件需要的额外信息
    // 标题
    title: { default: '默认标题' },
    // 总存栏数
    num: { default: 0 },
    // 展示数据
    data: {
      default: () => {
        return [
          {
            name: 'name1',
            value: 30
          },
          {
            name: 'name2',
            value: 50
          },
          {
            name: 'name3',
            value: 70
          },
          {
            name: 'name4',
            value: 90
          }
        ]
      }
    },
    // 样式设置
    colorLight: {
      default: () => ['#DB5F52', '#D69E41', '#58BCA0', '#A35EDA']
    },
    colorDark: {
      default: () => ['#341F24', '#332B21', '#1A3134', '#291F3F']
    }
  }
}
</script>

