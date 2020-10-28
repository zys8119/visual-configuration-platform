<template>
    <div class="ModuleManagement">
        <div class="cardList">
            <el-card class="card" v-for="(item,key) in list" :key="key">
                <div slot="header" class="clearfix">
                    <span class="title">{{ item.packName }}</span>
                    <el-dropdown>
                        <i class="el-icon-more-outline"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="synModule(item)">同步</el-dropdown-item>
                            <el-dropdown trigger="click"   placement="left-start">
                                <el-dropdown-item @click.native="getBranch(item)">切换分支</el-dropdown-item>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(it,key) in  branchList" :key="key" @click.native="checkout(item,it)">
                                        <span class="ZColor" :class="{primary:it.current}">{{it.type_str}}：{{it.origin}}</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown-item @click.native="addModule(item)">编辑</el-dropdown-item>
                            <el-dropdown-item @click.native="deleteModule(item)">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="content">
                    <p class="description">描述：<br>{{item.description}}</p>
                    <p class="ellipsis-1">同步状态：<span v-if="item.synStatus" class="ZColor" :class="{primary:item.synStatus === '2'}">{{ item.synStatus | synStatus }}</span></p>
                    <p class="ellipsis-1">当前版本：<span v-if="item.version">{{ item.version }}</span></p>
                    <p class="ellipsis-1">所属者：<span>{{ item.userName }}</span></p>
                    <p class="ellipsis-1">当前分支：<span v-if="item.branchName">{{ item.branchName }}</span></p>
                    <p class="ellipsis-1">地址：<span>{{ item.gitUrl }}</span></p>
                </div>
            </el-card>
        </div>
        <div class="cardFooter">
            <div class="cardFooterContent">
                <el-button class="el-button" type="primary" round @click="addModule(null)">添加模块</el-button>
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
            branchList:[],
        }
    },
    mounted() {
        this.init();
    },
    filters:{
        synStatus(val){
            return {
                '1':"未同步",
                '2':"已同步",
            }[val]
        }
    },
    methods:{
        // 初始化
        init(){
            this.api.Git.Index.gitModuleList().then(res=>this.list = res);
        },
        // 同步模块
        synModule(item){
            this.api.Git.Index.synModule(item).then(()=> {
                this.$message({
                    type: 'success',
                    message: '同步成功'
                });
                this.init();
            });
        },
        // 添加模块
        addModule(row){
            this.$ZAlert.show({
                title:row? "编辑模块":"添加模块",
                components:require("./Alert/AddModule"),
                props:{
                    row:()=>row
                },
                _event:{
                    save:this.init
                }
            })
        },
        // 删除模块
        deleteModule(item){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.api.Git.Index.deleteModule(item.id).then(()=> {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    this.init();
                });
            })
        },
        // 获取分支
        getBranch(item){
            this.api.Git.Index.gitModuleBranch(item).then(res=>{
                this.branchList = res;
            })
        },
        // 切换分支
        checkout(item,it){
            this.api.Git.Index.checkoutModuleBranch({
                ...item,
                branchName:it.origin,
                branchNameType:it.type,
            }).then(()=> {
                this.$message({
                    type: 'success',
                    message: '切换成功'
                });
                this.init();
            });
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
                .description{
                    border:1px solid #d8d8d8;
                    border-radius: 4px;
                    margin-bottom: @unit15;
                    padding: @unit15;
                    background-color: #d8d8d8;
                    font-size: 14px;
                    color: #666666;
                }
            }
            .clearfix{
                display: flex;
                .title{
                    color: @themeColor;
                    font-weight: bold;
                    flex: 1;
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