<template>
    <div class="AddModule">
        <el-form>
            <el-form-item label="模块名称" required><el-input v-model="formData.packName"></el-input></el-form-item>
            <el-form-item label="仓库地址" required><el-input v-model="formData.gitUrl"></el-input></el-form-item>
            <el-form-item label="所属者" required><el-input v-model="formData.userName"></el-input></el-form-item>
            <el-form-item label="描述"><el-input type="textarea" v-model="formData.description"></el-input></el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "AddModule",
    props:{
        row:{type:Object,default:null}
    },
    data(){
        return {
            formData:{}
        }
    },
    mounted() {
        if(this.row){ this.formData = {...this.row}}
    },
    methods:{
        // 保存
        save(){
            if(this.$utils.is_S(this.formData.packName)){return this.$message.error("请输入模块名称")}
            if(this.$utils.is_S(this.formData.gitUrl)){return this.$message.error("请输入仓库地址")}
            if(this.$utils.is_S(this.formData.userName)){return this.$message.error("请输入所属者")}
            if(this.row){
                this.api.Git.Index.updateModule(this.formData).then(()=>{
                    this.$message({type:"success",message:"保存成功"});
                    this.$emit("save");
                    this.$ZAlert.hide();
                })
                return ;
            }
            this.api.Git.Index.addModule(this.formData).then(()=>{
                this.$message({type:"success",message:"保存成功"});
                this.$emit("save");
                this.$ZAlert.hide();
            })
        }
    }
}
</script>

<style scoped lang="less">
.AddModule{
}
</style>