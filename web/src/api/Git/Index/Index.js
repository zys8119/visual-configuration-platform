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
    }
}