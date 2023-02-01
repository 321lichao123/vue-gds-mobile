<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!-- 底部导航栏 -->
        <van-tabbar class="tabbar" v-model="active" route>
            <van-tabbar-item to='/'>
                <template #icon>
                    <i class="iconfont icon-fangzi"></i>
                </template>
                置换中心
            </van-tabbar-item>
            <van-tabbar-item to='/notice'>
                <template #icon>
                    <i class="iconfont icon-gonggao"></i>
                </template>
                公告
            </van-tabbar-item>
            <van-tabbar-item to='/userprofile'>
                <template #icon>
                    <i class="iconfont icon-31wode"></i>
                </template>
                我的
            </van-tabbar-item>
            <!-- <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
            <van-tabbar-item class="iconfont" icon-prefix="icon" icon="tianqi" to='/weather'>天气</van-tabbar-item>
            <van-tabbar-item class="iconfont" icon-prefix="icon" icon="jihua" to='/todolist'>计划</van-tabbar-item>
            <van-tabbar-item icon="user-o" to='/my'>我的</van-tabbar-item> -->
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: 'layout',
        data() {
            return {
                active: 0,
            }
        },
        mounted(){
            this.$store.commit('ADDCACHEPAGE','layout');
        }
    }
</script>

<style scoped lang="less">
.tabbar{
    /deep/ .iconfont{
        font-size: 12px !important;
    }
}


</style>