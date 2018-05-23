<template>
    <el-container>
        <el-aside width="200px">
            <el-menu v-if="menu in menuList">
                <router-link :to="menu.link">{{menu.label}}</router-link>
            </el-menu>
        </el-aside>
    </el-container>
</template>
<script>
    import ElContainer from "../../../../node_modules/element-ui/packages/container/src/main.vue"
    export default {
        data(){
            return {
                menuList: [{
                    label: "账单查询",
                    link: "/billrecords"
                }, {
                    label: "个人资料",
                    link: "/userinfo"
                }]
            }
        },
        components: {
            ElContainer,
            RouterLink
        }
    }
</script>