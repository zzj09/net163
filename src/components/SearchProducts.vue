<template>
    <div>
        <van-dropdown-menu>
            <van-dropdown-item disabled title="综合" v-model="value1" :options="option1" />
            <van-dropdown-item title="价格" v-model="value2" :options="option2" />
            <van-dropdown-item title="分类" v-model="value2" :options="option2" />
        </van-dropdown-menu>
        
        <Products 
            v-for="(item,index) in searchProductsListData" 
            :key="item.id"
            :searchProductsListData="searchProductsListData"
        />
        
        
        
    </div>
</template>

<script>

import Products from "./Products.vue";
export default {
    data () {
        return {
            value1: 0,
            value2: 'a',
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 },
            ],
            option2: [
                { text: '全部', value: 'a' },
                { text: '居家', value: 'b' },
            ],
        
        }
    },
    components:{
        Products,
    },
    props:["searchProductsListData","filterCategory"],
}
</script>
 
<style lang = "less" scoped>
    
</style>