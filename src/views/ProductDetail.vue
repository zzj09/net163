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
        <van-cell title="展示弹出层" is-link @click="isSkuShow =! isSkuShow"/>
        <div class="attribute">
            <h3>商品参数</h3>
            <ul>
                <li v-for="(item,index) in attribute" :key="index">
                    <div class="l">{{item.name}}:</div>
                    <div class="r van-ellipsis">{{item.value}}</div>
                </li>
            </ul>
        </div>
        
        <div class="goods_desc" v-html="goods_desc"></div>

        <div class="title0">
            <span>常见问题</span>
        </div>
        <ul class="issue">
            <li v-for="item in issue" :key="item.id">
                <h3>{{item.question}}</h3>
                <p>{{item.answer}}</p>
            </li>
        </ul>
        
        <div class="title0">
            <span>大家都在看</span>
        </div>
        <Products :goodsList="goodsList"/>
        <van-sku
            v-model="isSkuShow"
            :sku="sku"
            :goods="goods"
            :hide-stock="sku.hide_stock"
        />
        <AppGoodActive style="padding-top: .5rem"/>
    </div>
</template>

<script>

import { GetGoodsDetailData,GetGoodsRelatedData } from "@/request/api";
import Tips from "@/components/Tips.vue"
import AppGoodActive from "@/components/AppGoodActive.vue"
import Products from "@/components/Products.vue"
export default {
    data () {
        return {
            isSkuShow: false,
            sku: {
                tree:[],
                hide_stock:false,       //要不要显示库存
                price: '0' ,             // 默认价格（单位元）
                stock_num: 0,         // 商品总库存
            },
            goods: {
                picture:"",
            },
// ----------------------------------------
            // 轮播图数据
            gallery:[],
            // 商品信息
            info:{},
            // 商品参数
            attribute:[],
            // 商品信息（大量图片信息）
            goods_desc:"",
            // 常见问题
            issue:[],
            // 大家都在买的商品
            goodsList:[],

            
 
        }
    },
    components:{
        Tips,
        AppGoodActive,
        Products,
    },
    created(){
        // 发送请求，请求这个商品的详情数据
        GetGoodsDetailData({id:this.$route.query.id})
        .then(res=>{
            console.log(res.data);
            if(res.data.errno == 0){
                let {gallery,info,attribute,issue} = res.data.data
                this.gallery = gallery
                this.info = info
                this.attribute = attribute
                this.goods_desc = info.goods_desc
                this.issue = issue

                // sku数据
                this.goods.picture = info.list_pic_url
                this.sku.price = info.retail_price
                this.sku.stock_num = info.goods_number
            }
        })
        .catch(err=>{
            console.log(err);
        })

        // 发送请求，获取相关产品数据
        GetGoodsRelatedData({id:this.$route.query.id})
        .then(res=>{
            // console.log("GetGoodsRelatedData:",res.data);
            if(res.data.errno == 0){
                this.goodsList = res.data.data.goodsList
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
    .title0 {
        width: 100%;
        background: #fff;
        height: 0.5rem;
        position: relative;
        &::before {
            content: "";
            width: 50%;
            height: 2px;
            background: #ccc;
            position: absolute;
            top: 50%;
            margin-top: -1px;
            left: 50%;
            margin-left: -25%;
        }
        span {
            width: 30%;
            position: relative;
            background: #fff;
            display: block;
            text-align: center;
            margin: 0 auto;
            height: 0.5rem;
            line-height: 0.5rem;
        }
    }
    .issue {
        padding: 0 4%;
        background: #fff;
        li {
            h3 {
                height: 0.3rem;
                line-height: 0.3rem;
                padding-left: 0.2rem;
                position: relative;
                font-weight: normal;
                &::before {
                    content: "";
                    width: 4px;
                    height: 4px;
                    background: darkred;
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    margin-top: -2px;
                }
            }
            p {
                font-size: 0.12rem;
                line-height: 0.2rem;
                padding-left: 0.2rem;
            }
        }
    }
    
</style>