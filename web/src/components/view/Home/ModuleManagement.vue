<template>
    <div class="ModuleManagement">
        asdasdasdasasdasd
    </div>
</template>

<script>
export default {
    name: "ModuleManagement",
    mounted() {
        this.api.Git.Index.a(22)
            .then(res=>{
            console.log(res)
        })
    }
}
</script>

<style scoped lang="less">
.ModuleManagement{
}
</style>