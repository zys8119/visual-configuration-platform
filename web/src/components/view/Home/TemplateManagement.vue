<template>
    <div class="TemplateManagement">
        <el-button class="settingBtn"
                   round circle icon="el-icon-plus"
                   @click="AddTemplate(null)" type="primary">
        </el-button>
    </div>
</template>

<script>
export default {
    name: "TemplateManagement",
    methods:{
        // 添加模板
        AddTemplate(){
            this.$ZAlert.show({
                title:"添加模板",
                components:require("./Alert/AddTemplate")
            })
        }
    }
}
</script>

<style scoped lang="less">
.TemplateManagement{
    .settingBtn{
        position: fixed;
        right: @unit15;
        bottom: @unit15;
    }
}
</style>