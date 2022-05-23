<template>
    <div>
        <van-list
            :finished="finished"
            finished-text="没有更多了"
        >
            <van-cell @click="tagClick(item)" v-for="(item,index) in searchTipsListData" :key="index" :title="item" />
        </van-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            finished: true,
    
        }
    },
    props:["searchTipsListData"],
    methods:{
        tagClick(val){
            this.$emit("tagClick",val)
        },
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>