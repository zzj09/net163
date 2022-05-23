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
         />
        <SearchTipsList 
            v-else-if="blockShow==2" 
            :searchTipsListData="searchTipsListData"
        />

    </div>

    
</template>

<script>

import {GetSearchPopupData,GetSearchTipsListData} from "@/request/api"
import HistoryHot from "@/components/HistoryHot.vue"
import SearchTipsList from "@/components/SearchTipsList.vue"
// import HistoryHot from "@/components/HistoryHot.vue"

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
            blockShow:2,
            // 历史记录的列表数据
            historyListData:[],
            // 热门搜索的列表数据
            hotListData:[],
            // 搜索实时提示的列表数据
            searchTipsListData:[],
 
        }
    },
    created(){
        

        GetSearchPopupData()
        .then(res=>{
            if(res.data.errno == 0){
                // console.log("res.data:",res.data);

                this.placeholderVal = res.data.data.defaultKeyword.keyword
                this.historyListData = res.data.data.historyKeywordList
                this.hotListData = res.data.data.hotKeywordList
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
     methods: {
        onSearch(val) {
            // 用户回车搜索的时候执行，val是用户输入的值

        },
        onCancel() {
            this.$router.go(-1)         // 返回上一级
        },
        onInput(val){

            // 发送请求，获取实时搜索的文本提示的数据列表
            GetSearchTipsListData({keyword:val})
            .then(res=>{
                if (res.data.errno == 0) {
                    this.searchTipsListData = res.data.data
                }
            })
            .catch(err=>{

            })
        }
    },
    components:{
        HistoryHot,
        SearchTipsList,
    },
}
</script>
 
<style lang = "less" scoped>
    .search-popup{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background-color: #efefef
    }
</style>