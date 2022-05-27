<template>
    <div>
        <van-dropdown-menu>
            <van-dropdown-item disabled title="综合" />
            <van-dropdown-item @change="priceChange" title="价格" v-model="priceVal" :options="option2" />
            <van-dropdown-item @change="categoryChange" title="分类" v-model="categoryVal" :options="filterCategory" />
        </van-dropdown-menu>
        
        <van-empty 
            v-if="goodsList.length == 0"
            image="search" 
            description="没有您搜索的商品" 
        />
        <Products 
            v-else
            :goodsList="goodsList"
        />
        
        
    </div>
</template>

<script>

import Products from "./Products.vue";
export default {
    data () {
        return {
            priceVal: "",
            categoryVal: 0,
            option2: [
                { text: '价格由高到低', value: 'desc' },
                { text: '价格由低到高', value: 'asc' },
            ],
        
        }
    },
    props:["goodsList","filterCategory"],
    beforeUpdate(){
        // 界面更新前（用户按回车后）， 遍历filterCategory数组，看看哪一项的checked为true
        // 遍历的时候 遇到checked为true时，就把this.categoryVal 改成它的value值，那这一项就被勾上
        this.filterCategory.map(item=>{
            // 如果item的checked为true，就改this.categoryVal
            if(item.checked){
                this.categoryVal = item.value
                return 
            }
        })
    },
    components:{
        Products,
    },
    methods:{
        categoryChange(value){
            // console.log(value);     // value就是分类id
            this.$emit("categoryChange",value)
        },
        priceChange(value){
            this.$emit("priceChange",value)
        }
    }
    
}
</script>
 
<style lang = "less" scoped>
    
</style>