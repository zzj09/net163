<template>
    <div>
        <van-goods-action>
            <van-goods-action-icon 
                :icon="isCollected?'star':'star-o'" 
                :text="isCollected?'已收藏':'未收藏'" 
                :color="isCollected?'#ff5000':'#333'" 
                @click="isCollected=!isCollected"
            />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="5" color="#333"/>
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 判断是否收藏
            isCollected:false,
 
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>