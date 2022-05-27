<template>
    <div>
        <Tips />
        <van-checkbox-group v-model="result" :disabled="isEditing">
            <van-checkbox :name="item.id" v-for="item in cartList" :key="item.id" @click="changeChecked(item)">
                <van-swipe-cell>
                    <van-card
                        :num="item.number"
                        :price="item.retail_price.toFixed(2)"
                        :title="item.goods_name"
                        :thumb="item.list_pic_url"
                    />
                    <template #right>
                        <van-button square text="删除" type="danger" class="delete-button" @click="delGood(item.product_id)"/>
                    </template>
                </van-swipe-cell>
                <van-stepper v-model="item.number" min="0" v-show="isEditing" @change="stepperChange(item)"/>
            </van-checkbox>
        </van-checkbox-group>
        <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="下单" @submit="onSubmit">
            <van-checkbox v-model="checkedAll" :disabled="isEditing">全选</van-checkbox>
            <template #tip>
                累计共{{cartTotal.checkedGoodsCount}}件商品，可点击 
                <van-button :type="isEditing?'danger':'primary'" size="mini" @click="editBtn">{{isEditing?'完成编辑':'编辑'}}</van-button> 
                按钮进行商品数量修改
            </template>
        </van-submit-bar>
    </div>
</template>

<script>

import { GetCartListData,ChangeGoodChecked,ChangeGoodStepperData,DeleteGood } from "@/request/api";
import Tips from "@/components/Tips.vue"
export default {
    data () {
        return {
            // 展示选中的元素的数组
            result:[],
            // 购物车列表数据
            cartList:[],
            // 存放购物车数量及合计价格
            cartTotal:{},
            // 编辑状态
            isEditing:false,
 
        }
    },
    created(){
        // 发送请求，获取购物车数据
        GetCartListData()
        .then(res=>{
            if(res.data.errno == 0){
                // console.log(res.data);
                this.totalFn(res.data.data);

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
            this.$toast("功能暂未开通")
        },
        totalFn(data){
            let {cartList,cartTotal} = data
            this.cartList = cartList
            this.cartTotal = cartTotal

            // 清空 result 数组，后面的操作不会是这个数组越来越长
            this.result = []
            this.cartList.map(item=>{
                item.checked==1?this.result.push(item.id):""
            })
        },
        changeChecked(item){
            if(this.isEditing){
                return
            }
            // 发送请求，更改复选框状态
            ChangeGoodChecked({
                isChecked: item.checked==0?1:0,
                productIds:item.product_id
            })
            .then(res=>{
                if(res.data.errno==0){
                    console.log(res.data);
                    this.totalFn(res.data.data)
                }
                
            })
            .catch(err=>{
                console.log(err);
            })
        },
        editBtn(){
            this.isEditing=!this.isEditing
        },
        stepperChange(item){
            // 发送请求，更改购物车数量
            ChangeGoodStepperData({
                goodsId: item.goods_id,
                id: item.id,
                number: item.number,
                productId: item.product_id,
            })
            .then(res=>{
                if(res.data.errno == 0){
                    this.totalFn(res.data.data)
                }
                
            })
            .catch(err=>{
                console.log(err);
            })

            if(item.number == 0){
                this.$toast.success("商品已删除")
                setTimeout(()=>{
                    this.delGood(item.product_id)
                },500)
                
            }
        },
        delGood(productId){
            // 发送请求，删除购物车商品
            DeleteGood({
                productIds: productId.toString(),
            })
            .then(res=>{
                if(res.data.errno == 0){
                    // console.log(res.data);
                    this.totalFn(res.data.data)
                    this.$toast.success("商品已删除")
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        
    },
    computed:{
        checkedAll:{
            get(){
                return this.result.length == this.cartList.length
                
            },
            set(val){       // 即将要修改成的值

                let ids_arr = [];
                this.cartList.map(item=>{
                    ids_arr.push(item.product_id)
                })

                ChangeGoodChecked({
                    isChecked: val?1:0,
                    productIds:ids_arr.join(),          // join()将数组转为字符串
                })
                .then(res=>{
                    if(res.data.errno==0){
                        console.log(res.data);
                        this.totalFn(res.data.data)
                    }  
                })
                .catch(err=>{
                    console.log(err);
                })
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
        margin-bottom: .91rem;
        background-color: rgb(250,250,250);

        .van-checkbox{
            padding: .05rem .15rem;
            border-bottom: 1px solid #ccc;
        } 
    }
    .van-button{
        transform: translateY(-.03rem);
    }
    .van-stepper{
        text-align: right;
    }
    .goods-card {
        margin: 0;
        background-color: white;
    }

    .delete-button {
        height: 100%;
    }
    
</style>