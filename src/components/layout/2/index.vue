<template>
  <div id="screen" :style="screenStyle">
    <!-- 标题 -->
    <div class="row title" :style="titleStyle">
      <slot name="title">标题插槽</slot>
    </div>
    <!-- 主体区域 -->
    <div class="row content">
      <!-- 左侧 -->
      <div class="col left" :style="colStyle(0)">
        <div ref="l1" class="item hov" :style="itemStyle"><slot name="l1"></slot></div>
        <div ref="l2" class="item hov" :style="itemStyle"><slot name="l2"></slot></div>
        <div ref="l3" class="item hov" :style="itemStyle"><slot name="l3"></slot></div>
      </div>
      <!-- 中间 -->
      <div class="col center" :style="colStyle(1)">
        <div ref="c1" class="item map">
          <div class="nav">
            <div
              v-for="item in nav"
              :key="item.value"
              class="nav-item"
              :class="{ active: item.value === navActive }"
              @click="navClick(item.value)">
              {{item.label}}
            </div>
          </div>
          <slot name="c1"></slot>
        </div>
        <div ref="c2" class="item hov" :style="infoStyle">
          <slot name="c2"></slot>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="col right" :style="colStyle(2)">
        <div ref="r1" class="item hov" :style="itemStyle"><slot name="r1"></slot></div>
        <div ref="r2" class="item hov" :style="itemStyle"><slot name="r2"></slot></div>
        <div ref="r3" class="item hov" :style="itemStyle"><slot name="r3"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 计算后的每个区域尺寸
    offsetSize: { default: () => {} },
    // 最外层的设置数据
    margin: { default: 20 },
    heightMax: { default: 1080 },
    widthMax: { default: 1920 },
    heightTitle: { default: 100 },
    // 列的设置数据
    widthCol: {
      default: () => ['25%', '50%', '25%']
    },
    // 中间底栏的高度
    heightInfo: { default: 160 },
    // 导航相关
    navActive: { default: 1 },
    nav: {
      default: () => [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 }
      ]
    }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight
    }
  },
  computed: {
    titleStyle () {
      // 顶部标题栏的样式
      return {
        height: this.heightTitle + 'px',
        backgroundColor: '#171F29',
        color: '#31AF8B',
        lineHeight: this.heightTitle + 'px',
        fontSize: this.heightTitle - 60 + 'px'
      }
    },
    itemStyle () {
      // 卡片的样式
      return {
        backgroundColor: '#171F29'
      }
    },
    screenStyle () {
      // 最外层容器的样式
      return {
        height: 'calc(100vh - ' + this.margin * 2 + 'px)',
        width: 'calc(100vw - ' + this.margin * 2 + 'px)',
        maxHeight: this.heightMax + 'px',
        maxWidth: this.widthMax + 'px'
      }
    },
    infoStyle () {
      // 中间下面的位置
      return {
        height: this.heightInfo + 'px',
        flexGrow: 0,
        ...this.itemStyle
      }
    }
  },
  mounted () {
    this.updateSize()
    const _this = this
    let timer = false
    window.onresize = () => {
      if (timer) {
        return false
      } else {
        timer = true
        setTimeout(() => {
          _this.screenWidth = document.body.clientWidth
          _this.screenHeight = document.body.clientHeight
          _this.updateSize()
          timer = false
        }, 1000)
      }
    }
  },
  methods: {
    colStyle (index) {
      // 列的样式 传入id 返回设置的百分比
      return {
        width: this.widthCol[index]
      }
    },
    navClick (value) {
      // 点击导航按钮
      this.$emit('update:navActive', value)
    },
    updateSize () {
      // 更新尺寸
      let res = {}
      for (var key of Object.keys(this.$refs)) {
        res[key] = {
          height: this.$refs[key].offsetHeight,
          width: this.$refs[key].offsetWidth
        }
      }
      this.$emit('update:offsetSize', res)
    }
  }
}
</script>

<style lang="scss" scoped>
#screen{
  display: flex;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  .row{
    // 内层的列要纵向自适应
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    &.title{
      font-weight: bold;
      letter-spacing: 6px;
      border-radius: 2px;
    }
    &.content{
      // content类是一个纵向自适应的容器
      flex-grow: 1;
    }
    .col{
      display: flex;
      flex-direction: column;
      .item{
        margin: 10px;
        margin-bottom: 0px;
        flex-grow: 1;
        border-radius: 2px;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        &.map{
          position: relative;
          .nav{
            height: 40px;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            // 让内部元素垂直水平居中
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: #FFF;
            .nav-item{
              padding: 4px 10px;
              color: #FFF;
              background-color: #32363F;
              &:nth-child(1){
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
              }
              &:nth-child(2){
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
              }
              &.active{
                background-color: #40B08E;
              }
            }
          }
        }
        &.hov{
          &:hover{
            box-shadow: 0px 0px 0px 1px rgba(#FFF,.2);
          }
        }
      }
      &.center{
        .item{
          margin-left: 0px;
          margin-right: 0px;
        }
      }
      &.left{
        .item{
          margin-left: 0px;
        }
      }
      &.right{
        .item{
          margin-right: 0px;
        }
      }
    }
  }
}
</style>
