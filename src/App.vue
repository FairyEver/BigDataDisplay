<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  // background-image: linear-gradient(to bottom, #243949 0%, #517fa4 100%);
  background-image: linear-gradient(-180deg, #0A4360 0%, #0E3C55 26%, #1B2838 100%);
}
</style>

