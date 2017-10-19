<template>
  <div id="body">
    <div
      class="item"
      :class="isActive(item.value)"
      v-for="item in option"
      :key="item.value"
      @click="activeThis(item.value)">
      {{item.label}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: { default: 1 },
    option: {
      default: () => [
        {
          label: 'label1',
          value: 1
        },
        {
          label: 'label2',
          value: 2
        }
      ]
    }
  },
  data () {
    return {
      activeSelf: 0
    }
  },
  created () {
    this.activeSelf = this.active
  },
  methods: {
    isActive (value) {
      return this.activeSelf === value ? 'active' : ''
    },
    activeThis (value) {
      this.activeSelf = value
      this.$emit('update:active', value)
    }
  }
}
</script>

<style lang="scss" scoped>
#body{
  display: flex;
  justify-content: center;
  align-items: center;
  .item{
    padding: 5px 20px;
    margin: 0px 4px;
    cursor: pointer;
    color: #2E6780;
    margin-bottom: 2px;
    &:hover{
      background-color: rgba(#000,0.1);
      color: #52D7E9;
    }
    &.active{
      color: #52D7E9;
      border-bottom: 2px solid #51F0E0;
      margin-bottom: 0px;
    }
  }
}
</style>


