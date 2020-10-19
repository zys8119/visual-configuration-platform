<template>
    <div class="HomePage">
        <div class="topBanner">
            <img class="logo" :src="require('@/assets/web_logo1.png')" alt="">
            <el-tabs class="el-tabs" v-model="activeName" @tab-click="$router.push(activeName)">
                <el-tab-pane v-for="(item,key) in tabs" :key="key" :label="item.label" :name="item.page"></el-tab-pane>
            </el-tabs>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "HomePage",
    data(){
        return {
            tabs:[
                {label:"模块管理", page:'module-management'},
                {label:"主题管理", page:'theme-management'},
                {label:"服务管理", page:'serve-management'},
                {label:"模板管理", page:'template-management'},
            ],
            activeName:"module-management"
        }
    }
}
</script>

<style scoped lang="less">
.HomePage{
    .topBanner{
        background-color: @themeColor;
        text-align: center;
        padding-top: @unit15;
        .logo{
            width: 300px;
            margin: 50px auto;
            display: block;
        }
        /deep/ .el-tabs{
            .el-tabs__item{
                color: #ffffff;
                text-align: center;
                padding: 0 20px;
                &.is-active{
                    background-color: #ffffff;
                    color: @themeColor;
                    font-weight: bold;
                }
            }
            .el-tabs__active-bar{
                background-color: #ffffff;
            }
            .el-tabs__header{
                margin-bottom: 0;
            }
            .el-tabs__content{
                display: none;
            }
            .el-tabs__nav{
                margin: auto;
                float: none;
            }
        }
    }
}
</style>