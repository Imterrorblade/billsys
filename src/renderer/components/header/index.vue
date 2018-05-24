<template>
    <el-header class="">
        <span class="" v-if="username">
            <span>{{username}}</span>
            <span><i></i></span>
        </span>
        <span class="" v-if="!username">
            <span><router-link to="/login">登录</router-link></span>
            <span><router-link to="/regist">注册</router-link></span>
        </span>
    </el-header>
</template>
<script>
  export default {
    data () {
      return {
        username: ''
      }
    }
  }
</script>
<style >

</style>