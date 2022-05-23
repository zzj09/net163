<template>
    <div>
        <div class="his-hot">
            <div class="hd">
                <h4>历史记录</h4>
                <van-icon name="delete-o" />
            </div>
            <div class="bd">
                <van-tag plain type="default" v-for="(item,index) in historyListData" :key="index">{{item}}</van-tag>
            </div>
        </div>

        <div class="his-hot">
            <div class="hd">
                <h4>热门搜索</h4>
            </div>
            <div class="bd">
                <van-tag plain type="default" v-for="(item,index) in hotListData" :key="index" :class="item.is_hot?'red':''">{{item.keyword}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

 
        }
    },
    props:["historyListData","hotListData"]
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