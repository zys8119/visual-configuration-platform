<template>
    <div class="AddTemplate">
        <div class="el-drawer-content">
            <el-form>
                <el-form-item label="模板名称">
                    <el-input type="textarea" v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="绑定模板" required>
                    <el-select v-model="formData.m_id" filterable clearable>
                        <el-option v-for="(item,key) in ModuleList" :key="key" :label="`【${item.packName}】【${item.userName}】【${item.branchName}】【${item.gitUrl}】`" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="formData.description"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddTemplate",
    data(){
        return {
            ModuleList:[],
            formData: {}
        }
    },
    mounted() {
        this.init();
    },
    methods:{
        init(){
            this.api.Git.Index.gitModuleList().then(res=>{
                this.ModuleList = res;
            })
        },
        // 保存模板
        save(){
            if(this.$utils.is_S(this.formData.m_id)){return this.$message.error("请选择模板")}
        },
    }
}
</script>

<style scoped lang="less">
.AddTemplate{
}
</style>