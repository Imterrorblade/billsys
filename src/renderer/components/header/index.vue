<template>
    <el-container>
        <el-header class="right">
            <span class="right" v-if="username">
                <span>{{username}}</span>
                <span><i></i></span>
            </span>
            <span class="right" v-if="!username">
                <span><router-link to="/login">登录</router-link></span>
                <span><router-link to="/regist">注册</router-link></span>
            </span>
        </el-header>
    </el-container>
</template>
<script>
    import RouterLink from "vue-router"
    export default {
        data(){
            return {
                username: ""
            }
        },
        components: {
            RouterLink
        }
    }
</script>
<style scoped="">
.right {
    float: right;
}
</style>