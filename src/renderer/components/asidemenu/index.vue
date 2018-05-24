<template>
    <el-aside width="200px">
        <el-menu :default-opened="['1', '3']">
            <el-menu-item v-for="(menu, index) in menuList" :index="index">{{menu.label}}</el-menu-item>
        </el-menu>
    </el-aside>
</template>
<script>
  export default {
    data () {
      return {
        menuList: [{
          label: '账单查询',
          link: '/page/billlist'
        }, {
          label: '个人资料',
          link: '/userinfo'
        }]
      }
    }
  }
</script>