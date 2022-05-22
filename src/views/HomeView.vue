<template>
  <div class="home">
    <!-- 首页搜索框 -->
    <van-search v-model="SearchVal" shape="round" placeholder="请输入搜索关键词" disabled/>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" width="100%">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

// import axios from "axios";
// import request from "@/request/request"
import {GetHomeList} from "@/request/api"

export default {
  name: 'HomeView',
  data(){
    return{
      SearchVal:"",   // 搜索框的值
      banner:[],    // 轮播图图片
    }
  },
  created(){
    GetHomeList()
    .then(res=>{
      console.log(res.data.banner);
      this.banner = res.data.banner
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


