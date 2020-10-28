export default {
    gitModuleList(){
        return this.axios({
            url:"/Git/Index/gitModuleList",
            params:{
                pageNo:1,
                pageSize:10,
            }
        });
    },
    addModule(data){
        return this.axios({
            url:"/Git/Index/addModule",
            method:"post",
            data
        });
    },
    updateModule(data){
        return this.axios({
            url:"/Git/Index/updateModule",
            method:"post",
            data
        });
    },
    deleteModule(id){
        return this.axios({
            url:"/Git/Index/deleteModule",
            method:"post",
            data:{id}
        });
    },
    synModule(data){
        return this.axios({
            url:"/Git/Index/synModule",
            method:"post",
            data
        });
    },
    gitModuleBranch(data){
        return this.axios({
            url:"/Git/Index/gitModuleBranch",
            method:"post",
            data
        });
    }
}