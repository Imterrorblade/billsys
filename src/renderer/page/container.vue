<template>
    <el-container class="container" direction="vertical">
        <Header></Header>
        <el-container >
            <asideMenu></asideMenu>
            <el-main>
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-col>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
  import Header from '../components/header'
  import Footer from '../components/footer'
  import AsideMenu from '../components/asidemenu'

  export default {
    components: {
      Header,
      Footer,
      AsideMenu
    }
  }
</script>
<style lang="less">
    .container {
        width: 100%;
        height: 100%;
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
</style>