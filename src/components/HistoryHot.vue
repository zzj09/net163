<template>
    <div>
        <div class="his-hot" v-show="isShowHistory">
            <div class="hd">
                <h4>历史记录</h4>
                <van-icon name="delete-o" @click="clearHistory" />
            </div>
            <div class="bd">
                <van-tag @click="tagClick(item)" plain type="default" v-for="(item,index) in historyListData" :key="index">{{item}}</van-tag>
            </div>
        </div>

        <div class="his-hot">
            <div class="hd">
                <h4>热门搜索</h4>
            </div>
            <div class="bd">
                <van-tag @click="tagClick(item.keyword)" plain type="default" v-for="(item,index) in hotListData" :key="index" :class="item.is_hot?'red':''">{{item.keyword}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>

import { ClearHistory } from "@/request/api";
export default {
    data () {
        return {
            isShowHistory:true
 
        }
    },
    props:["historyListData","hotListData"],
    methods:{
        tagClick(val){
            this.$emit("tagClick",val)
        },
        clearHistory(){         // 清空历史记录

            ClearHistory().then(res=>{
                if(res.data.errno == 0){
                    setTimeout(()=>{
                        // 隐藏历史记录的盒子
                        this.isShowHistory = false
                    },1000)
                    // 提示语
                    this.$toast.success('删除成功');
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    
}
</script>
 
<style lang = "less" scoped>
    .his-hot{
        background-color: #fff;
        padding: .1rem;
        margin-bottom: .2rem;

        .hd{
            display: flex;
            justify-content: space-between;
            font-size: .21rem;
            margin-bottom: .08rem;

            h4{
                font-size: .20rem;
            }
        }

        .van-tag{
            margin-right: .05rem;
            padding: .02rem;
            margin-bottom: .05rem;
        }
        .red{
            color:rgb(196, 4, 4);
        }
    }
</style>