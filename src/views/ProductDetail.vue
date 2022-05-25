<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in gallery" :key="item.id">
                <img :src="item.img_url" alt="" width="100%" style="display:block">
            </van-swipe-item>
        </van-swipe>
        <Tips />
        <div class="info">
            <div class="title">{{info.name}}</div>
            <div class="goods_brief">{{info.goods_brief}}</div>
            <div class="retail_price">{{info.retail_price | RMBformat}}</div>
        </div>
        <van-cell title="展示弹出层" is-link />
    </div>
</template>

<script>

import { GetGoodsDetailData } from "@/request/api";
import Tips from "@/components/Tips.vue"
export default {
    data () {
        return {
            // 轮播图数据
            gallery:[],
            // 商品信息
            info:{},
 
        }
    },
    components:{
        Tips,
    },
    created(){
        // 发送请求，请求这个商品的详情数据
        GetGoodsDetailData({id:this.$route.query.id})
        .then(res=>{
            console.log(res.data);
            if(res.data.errno == 0){
                let {gallery,info} = res.data.data
                this.gallery = gallery
                this.info = info
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
}
</script>
 
<style lang = "less" scoped>
    .info{
        background-color: #fff;
        text-align: center;
        line-height: .4rem;
        padding: .1rem 0;
        border-bottom: 1px solid #ccc;
        .title{
            font-size: .2rem;
        }
        .reteil_price{
            color: darkred;
        }
    }
</style>