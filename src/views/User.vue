<template>
    <div>
        <van-row>
            <van-col span="6">
                <img :src="avatarSrc" alt />
            </van-col>
            <van-col span="10">用户登录</van-col>
            <van-col span="8">
                <van-icon name="arrow" />
            </van-col>
        </van-row>
        <van-grid :column-num="3" square>
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
    </div>
</template>

<script>
export default {
    data () {
        return {
            avatarSrc:require("../assets/avatar.png")
 
        }
    }
}
</script>
 
<style lang = "less" scoped>
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 0.7rem;
    font-size: 0.18rem;
    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
</style>