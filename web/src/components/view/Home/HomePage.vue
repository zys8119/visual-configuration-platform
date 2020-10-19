<template>
    <div class="HomePage">
        <div class="topBanner">
            <img class="logo" :src="require('@/assets/web_logo1.png')" alt="">
            <el-tabs class="el-tabs">
                <el-tab-pane label="asdas"></el-tab-pane>
                <el-tab-pane label="asdas"></el-tab-pane>
                <el-tab-pane label="asdas"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomePage"
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
                &.is-active{
                    background-color: #ffffff;
                    color: @themeColor;
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
        }
    }
}
</style>