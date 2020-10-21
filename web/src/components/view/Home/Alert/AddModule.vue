<template>
    <div class="AddModule">
        <el-form>
            <el-form-item label="模块名称" required><el-input></el-input></el-form-item>
            <el-form-item label="仓库地址" required><el-input></el-input></el-form-item>
            <el-form-item label="所属者" required><el-input></el-input></el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "AddModule",
}
</script>

<style scoped lang="less">
.AddModule{
}
</style>