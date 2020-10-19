import axios from "./axios"
import api from "@/api"
const plugin = {
    install(vue){
        vue.prototype.axios = new axios();
        vue.prototype.api = new api();
    }
}
export default plugin
export const install = plugin.install