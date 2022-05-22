<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
        >
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            list: [1,2,3,4,5],
            loading: false,
            finished: true,
    
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>