<template>
    <div>
        <van-row @click="isShowModal = !isShowModal">
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

        <!-- 登录的模态窗口 -->
        <transition name="van-fade">
            <div class="login-modal" v-show="isShowModal">
                <div class="close-modal"  @click="isShowModal = !isShowModal"></div>
                <van-form @submit="onSubmit" class="login-form">
                    <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px">
                    <van-button round block type="info" native-type="submit"
                        >提交</van-button
                    >
                    </div>
                </van-form>
            </div>
        </transition>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatarSrc: require("../assets/avatar.png"),
            username: '',
            password: '',
            isShowModal:false,
        };
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values);
        },
    },
};
</script>
 
<style lang = "less" scoped>
.login-modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;
}
.login-form{
    width: 90%;
    background-color: #fff;
    padding-bottom: .2rem;
    position: absolute;
    left: 50%;
    top: 35%;
    margin-left: -45%;
}
.close-modal{
    width: 100%;
    height: 100%;
}

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