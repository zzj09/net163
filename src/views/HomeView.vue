<template>
  <div class="home">
    <!-- 首页搜索框 -->
    <van-search v-model="SearchVal" shape="round" placeholder="请输入搜索关键词" disabled @click="handleClick"/>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="blue">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" width="100%">
      </van-swipe-item>
    </van-swipe>

    <transition name="van-fade">
      <div class="popup-shadow" v-show="$store.state.isShowPopupShadow"></div>
    </transition>
    <transition name="van-slide-right">
      <router-view />
    </transition>
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
      // console.log(res.data.data.banner);
      this.banner = res.data.data.banner
    })
    .catch(err=>{
      console.log("Error");
      console.log(err);
    })
  },
  methods:{
    handleClick(){
      this.$router.push('/home/searchPopup')
      // 修改isShowPopupShadow的值
      this.$store.commit("changeIsShowPopupShadow",true)
    }
  }
}
</script>

<style lang="less">
.popup-shadow{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 98;
}

</style>


