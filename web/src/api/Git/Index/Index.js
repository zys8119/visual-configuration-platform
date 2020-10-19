export default {
    gitModuleList(){
        return this.axios({
            url:"/Git/Index/gitModuleList",
        });
    }
}