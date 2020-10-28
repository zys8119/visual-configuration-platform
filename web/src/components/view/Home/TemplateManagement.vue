<template>
    <div class="TemplateManagement">
        <el-button class="settingBtn" round circle icon="el-icon-setting" @click="drawer = true" type="primary">        </el-button>
        <el-drawer
            :visible.sync="drawer"
            :with-header="false">
            <div class="el-drawer-content">
                <h1>模板管理配置面板</h1>
                <el-divider>模板绑定</el-divider>
                <el-form>
                    <el-form-item label="绑定模板">
                        <el-select></el-select>
                    </el-form-item>
                </el-form>
            </div>

        </el-drawer>
    </div>
</template>

<script>
export default {
    name: "TemplateManagement",
    data(){
        return {
            drawer:true,
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
    .el-drawer-content{
        padding: @unit15;
    }
}
</style>