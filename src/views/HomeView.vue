<template>
  <div class="home">
    <van-search v-model="SearchVal" shape="round" placeholder="请输入搜索关键词" disabled/>
    <p>这是p标签</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// import axios from "axios";
import request from "@/request/request"

export default {
  name: 'HomeView',
  data(){
    return{
      SearchVal:""
    }
  },
  created(){
    request.get("/index/index")
    .then(res=>{
      console.log("Success");
      console.log(res.data);
    })
    .catch(err=>{
      console.log("Error");
      console.log(err);
    })
  },
  components: {
    
  }
}
</script>
