<template>
  <div id="app">
    <router-view/>
    <AppTabbar />
  </div>
</template>

<script>

import AppTabbar from "@/components/AppTabbar.vue" 
export default {
    components:{
      AppTabbar,
    }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  min-height:100%;
  font-size: .14rem
}
body,html{
  height: 100%;
}
html{
  // !important  的作用是： 提高指定样式规则的应用优先权
  font-size: 100px!important;           // 当html字体设置为100px时， 1个rem 为100px     需要多少px 除以 100  即是多少 rem     手机中一般使用rem，不使用px
}

</style>
