<template>
    <el-aside class="menu-expanded">
        <el-menu :default-active="$route.path"
                 unique-opened router
                 class="el-menu-vertical-demo">
            <template v-for="(item, index) in menuList">
                <el-submenu :index="index+''">
                    <template slot="title"><i :class="item.iconCls"></i>{{item.label}}</template>
                    <el-menu-item v-for="(it, i) in item.children" :index="it.path" :key="index + '-' + i">{{it.label}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </el-aside>
</template>
<script>
  export default {
    data () {
      return {
        menuList: [{
          label: '账单管理',
          children: [{
            label: '账单查询',
            path: '/page/billlist'
          }]
        }, {
          label: '用户管理',
          children: [{
            label: '个人信息',
            path: 'userinfo'
          }]
        }]
      }
    }
  }
</script>
<style lang="less" >
    @bg-1:#eef1f6;
    @bg-2:#d1dbe5;
    @color-active:#20a0ff;
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        aside {
            flex: 0 0 230px;
            width: 230px;
            // position: absolute;
            // top: 0px;
            // bottom: 0px;
            .el-menu {
                height: 100%;
                border-radius: 2px;
                list-style: none;
                position: relative;
                margin: 0;
                padding-left: 0;
                background-color: @bg-1;
            }
            .el-submenu {
                .el-menu{
                    background: #e4e8f1;
                }
                .el-menu-item:hover{
                    background: @bg-2;
                }
            }
            .el-submenu.is-active {
                border-bottom-color:@color-active;
            }
            .el-submenu__title {
                border-bottom-color:@color-active;
            }
            .el-submenu__title:hover {
                background:@bg-2;
            }
            .collapsed {
                width: 60px;
                .item {
                    position: relative;
                }
                .submenu {
                    position: absolute;
                    top: 0px;
                    left: 60px;
                    z-index: 99999;
                    height: auto;
                    display: none;
                }
            }
        }
        .menu-collapsed {
            flex: 0 0 60px;
            width: 60px;
        }
        .menu-expanded {
            flex: 0 0 230px;
            width: 230px;
        }
    }
</style>