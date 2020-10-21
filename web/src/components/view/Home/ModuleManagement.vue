<template>
    <div class="ModuleManagement">
        <div class="cardList">
            <el-card class="card" v-for="(item,key) in list" :key="key">
                <div slot="header" class="clearfix">
                    <span class="title">{{ item.packName }}</span>
                </div>
                <div class="content">
                    <p class="ellipsis-1">同步状态：<span>{{ item.synStatus }}</span></p>
                    <p class="ellipsis-1">当前版本：<span>{{ item.branchName }}</span></p>
                    <p class="ellipsis-1">所属者：<span>{{ item.userName }}</span></p>
                    <p class="ellipsis-1">当前分支：<span>{{ item.branchName }}</span></p>
                    <p class="ellipsis-1">地址：<span>{{ item.gitUrl }}</span></p>
                </div>
            </el-card>
        </div>
        <div class="cardFooter">
            <div class="cardFooterContent">
                <el-button class="el-button" type="primary" round @click="addModule">添加模块</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModuleManagement",
    data(){
        return {
            list:[],
        }
    },
    mounted() {
        this.api.Git.Index.gitModuleList(22).then(res=>this.list = res);
    },
    methods:{
        // 添加模块
        addModule(){
            this.$ZAlert.show({
                title:"添加模块",
                components:require("./Alert/AddModule")
            })
        }
    }
}
</script>

<style scoped lang="less">

.ModuleManagement{
    .cardList{
        display: grid;
        grid-template-columns: repeat(3,auto);
        @media (min-width: 1600px) {
            grid-template-columns: repeat(5,auto);
        }
        grid-gap: @unit15;
        padding: @unit15;
        .card{
            cursor: pointer;
            .content{
                .ellipsis-1{
                    line-height: 30px;
                    &+.ellipsis-1{
                        margin-top: @unit15;
                    }
                    span{
                        background-color: #e5e5e5;
                        padding: 0 @unit15;
                        border-radius: 5px;
                    }
                }
            }
            .clearfix{
                .title{
                    color: @themeColor;
                    font-weight: bold;
                }
            }
            &:hover{
                background-color: @themeColor;
                color: #ffffff;
                transform: scale(1.05);
                .content{
                    .ellipsis-1{
                        span{
                            background-color: #ffffff;
                            color: @themeColor;
                        }
                    }
                }
                .clearfix{
                    .title{
                        color: #ffffff;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    .cardFooter{
        height: 50px;
        line-height: 50px;
        text-align: center;
        .cardFooterContent{
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #ffffff;
            box-shadow: 0 -3px 3px #e5e5e5;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            .el-button{
                display: inline-block;
            }
        }
    }
}
</style>