<template>
 <div class="container">
     <el-container direction="vertical">
         <Header></Header>
         <el-container direction="vertical">
             <el-container>
                 <asideMenu></asideMenu>
                 <el-main>
                     <router-view></router-view>
                 </el-main>
             </el-container>
             <Footer></Footer>
         </el-container>
     </el-container>
 </div>
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
        width:100%;
        height:100%;
    }
</style>