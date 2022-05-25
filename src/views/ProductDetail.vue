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
        <div class="attribute">
            <h3>商品参数</h3>
            <ul>
                <li v-for="(item,index) in attribute" :key="index">
                    <div class="l">{{item.name}}:</div>
                    <div class="r van-ellipsis">{{item.value}}</div>
                </li>
            </ul>
        </div>
        <div class="goods_desc_div">
            <div class="goods_desc" v-html="goods_desc"></div>
        </div>
        
        <AppGoodActive />
    </div>
</template>

<script>

import { GetGoodsDetailData } from "@/request/api";
import Tips from "@/components/Tips.vue"
import AppGoodActive from "@/components/AppGoodActive.vue"
export default {
    data () {
        return {
            // 轮播图数据
            gallery:[],
            // 商品信息
            info:{},
            // 商品参数
            attribute:[],
            // 商品信息（大量图片信息）
            goods_desc:""
 
        }
    },
    components:{
        Tips,
        AppGoodActive,
    },
    created(){
        // 发送请求，请求这个商品的详情数据
        GetGoodsDetailData({id:this.$route.query.id})
        .then(res=>{
            console.log(res.data);
            if(res.data.errno == 0){
                let {gallery,info,attribute} = res.data.data
                this.gallery = gallery
                this.info = info
                this.attribute = attribute
                this.goods_desc = info.goods_desc
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
    .attribute{
        background-color: #fff;
        margin-top: .2rem;
        padding: .1rem 4%;
        h3{
            font-size: 0.1638rem;
            line-height: .5rem;
        }
        li{
            height: .4rem;
            line-height: .4rem;
            background-color: #efefef;
            display: flex;
            margin-bottom: .1rem;
            border-radius: .05rem;
            .l{
                flex: 3;
                text-align: right;
                margin-right: .1rem;
                font-size: .12rem;
            }
            .r{
                flex: 7;
                font-size: .168rem;
            }
        }
    }
    /* 深度样式写法，穿透ui组件的样式，直接添加在标签上 */
    /deep/.goods_desc{
        img{
            display: block;
            width: 100%;
        }
    }
    .goods_desc_div{
        padding-bottom: .5rem;
        
    }
</style>