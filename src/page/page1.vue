<template>
  <layout>
    <template slot="l1">l1</template>
    <template slot="l2">l2</template>
    <template slot="l3">l3</template>
    <template slot="c1">标题</template>
    <template slot="c2">地图</template>
    <template slot="c3">c3</template>
    <template slot="r1">r1</template>
    <template slot="r2">r2</template>
    <template slot="r3">r3</template>
  </layout>
</template>

<script>
import layout from '@/components/layout/layout'
export default {
  components: {
    layout
  }
}
</script>
