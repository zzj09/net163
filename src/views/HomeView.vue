<template>
  <div class="home">
    <van-button type="info">主要按钮</van-button>
    <van-stepper v-model="value" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'HomeView',
  data(){
    return{
      value:1
    }
  },
  components: {
    
  }
}
</script>
