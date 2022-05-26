<template>
    <div>
        <Tips />
        <van-checkbox-group v-model="result">
            <van-checkbox :name="item.id" v-for="item in cartList" :key="item.id">
                <van-card
                    :num="item.number"
                    :price="item.retail_price.toFixed(2)"
                    :title="item.goods_name"
                    :thumb="item.list_pic_url"
                />
            </van-checkbox>
        </van-checkbox-group>
        <van-submit-bar :price="cartGoodsAmount" button-text="下单" @submit="onSubmit">
            <van-checkbox v-model="checkedAll">全选</van-checkbox>
            <template #tip>
                累计共{{cartCount}}件商品，可点击 <van-button type="primary" size="mini">编辑</van-button> 按钮进行商品数量修改
            </template>
        </van-submit-bar>
    </div>
</template>

<script>

import { GetCartListData } from "@/request/api";
import Tips from "@/components/Tips.vue"
export default {
    data () {
        return {
            // 展示选中的元素的数组
            result:[],
            // 购物车商品数量
            cartCount:0,
            // 购物车列表数据
            cartList:[],
            // 购物车合计价格
            cartGoodsAmount:0,
 
        }
    },
    created(){
        // 发送请求，获取购物车数据
        GetCartListData()
        .then(res=>{
            if(res.data.errno == 0){
                console.log(res.data);
                let {cartList,cartTotal} = res.data.data
                this.cartList = cartList
                this.cartCount = cartTotal.checkedGoodsCount
                this.cartGoodsAmount = cartTotal.checkedGoodsAmount*100

                this.cartList.map(item=>{
                    item.checked==1?this.result.push(item.id):""
                })

            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    },
    components:{
        Tips,
    },
    methods:{
        onSubmit(){

        },
    },
    computed:{
        checkedAll:{
            get(){
                return this.result.length == this.cartList.length
                
            },
            set(){

            }
            
        }
    },
}
</script>
 
<style lang = "less" scoped>
    .van-submit-bar{
        margin-bottom: .5rem;
        border-bottom: 1px solid #ccc;
    }
    /deep/.van-checkbox__label{
        flex: 1;
    }
    .van-checkbox-group{
        padding-bottom: .91rem;
        background-color: rgb(250,250,250);

        .van-checkbox{
            padding: .05rem .15rem;
            border-bottom: 1px solid #ccc;
        } 
    }
    .van-button{
        transform: translateY(-.03rem);
    }
    
</style>