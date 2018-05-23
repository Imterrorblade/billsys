<template>
 <div>
     <Header></Header>
     <div>
         <asideMenu></asideMenu>
         <el-container>
             <el-main>
                 <router-view></router-view>
             </el-main>
         </el-container>
     </div>
     <Footer></Footer>
 </div>
</template>
<script>
    import Header from "../components/header"
    import Footer from "../components/footer"
    import AsideMenu from "../components/asidemenu"
    import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
    import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";
    export default {
        components: {
            ElMain,
            ElContainer,
            header,
            footer,
            asideMenuH
        }
    }
</script>