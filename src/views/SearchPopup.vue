<template>
    <div class="search-popup">
        <van-search
            v-model="searchVal"
            show-action
            :placeholder="placeholderVal"
            @search="onSearch"
            @cancel="onCancel"
            @input="onInput"
        />
    <!--  @input="onInput"  表示输入框内容发生变化的时候触发onInput这个事件函数 -->

        <HistoryHot
            v-if="blockShow==1" 
            :historyListData="historyListData" 
            :hotListData="hotListData"
            @tagClick="tagClick"
         />
        <SearchTipsList 
            v-else-if="blockShow==2" 
            :searchTipsListData="searchTipsListData"
            @tagClick="tagClick"
        />
        <SearchProducts
            v-else
            :goodsList="goodsList"
            :filterCategory="filterCategory"
            @categoryChange="categoryChange"
            @priceChange="priceChange"
        />

    </div>

    
</template>

<script>

import {GetSearchPopupData,GetSearchTipsListData,GetGoodsListData} from "@/request/api"
import HistoryHot from "@/components/HistoryHot.vue"
import SearchTipsList from "@/components/SearchTipsList.vue"
import SearchProducts from "@/components/SearchProducts.vue"

export default {
    data () {
        return {
            // 搜索框，用户输入文字
            searchVal:"",
            // 占位符文本
            placeholderVal:"",
            // 值可以为1，2，3
            // 为1，表示展示历史记录和热门搜索
            // 为2，表示展示搜索提示的文本
            // 为3，表示展示搜索产品的内容
            blockShow:1,
            // 历史记录的列表数据
            historyListData:[],
            // 热门搜索的列表数据
            hotListData:[],
            // 搜索实时提示的列表数据
            searchTipsListData:[],
            // 搜索产品内容的列表数据
            goodsList:[],
            // 搜索产品内容的分类数据
            filterCategory:[],
            // 表示价格排序：（由高到低或者由低到高）
            order:"desc",
            // 分类id
            categoryId:0,
            // 默认的搜索方式  是 id 还是 price
            sort:"id",

 
        }
    },
    created(){
        GetSearchPopupData()
        .then(res=>{
            if(res.data.errno == 0){
                // console.log("res.data:",res.data);
                let {defaultKeyword,historyKeywordList,hotKeywordList} = res.data.data
                this.placeholderVal = defaultKeyword.keyword
                this.historyListData = historyKeywordList
                this.hotListData = hotKeywordList
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
     methods: {
        tagClick(value){     // 点击标签，直接搜索
            this.searchVal = value
            this.onSearch(value)
        },
        categoryChange(value){
            this.categoryId = value
            // 发送搜索商品的请求
            this.onSearch(this.searchVal)
        },
        priceChange(value){
            this.order = value
            this.sort = "price"
            this.onSearch(this.searchVal)
        },
        onSearch(val) {
            // 用户回车搜索的时候执行，val是用户输入的值
            this.blockShow = 3

            GetGoodsListData({
                keyword:val,
                page:1,
                size:10,
                order: this.order,
                categoryId: this.categoryId,
                sort: this.sort
            }).then(res=>{
                if (res.data.errno == 0) {
                    // console.log(res.data.data);
                    let {filterCategory,goodsList} = res.data.data
                    this.goodsList = goodsList

                    // 将搜索产品内容的分类数据中的 name和id字段 改为 text和value字段
                    let newArr = JSON.parse(JSON.stringify(filterCategory).replace(/name/g, 'text').replace(/id/g, 'value'))

                    this.filterCategory = newArr
                }
            })
            .catch(err=>{
                console.log(err);
            })
        },
        onCancel() {
            this.$router.go(-1)         // 返回上一级
            this.$store.commit("changeIsShowPopupShadow",false)
            this.$store.commit("changeIsShowHomeProduct",true)
        },
        onInput(val){
            this.blockShow = 2
            // 发送请求，获取实时搜索的文本提示的数据列表
            GetSearchTipsListData({keyword:val})
            .then(res=>{
                if (res.data.errno == 0) {
                    this.searchTipsListData = res.data.data
                }
            })
        }
    },
    components:{
        HistoryHot,
        SearchTipsList,
        SearchProducts,
    },
}
</script>
 
<style lang = "less" scoped>
.search-popup{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #efefef;
    z-index: 99;
}
</style>