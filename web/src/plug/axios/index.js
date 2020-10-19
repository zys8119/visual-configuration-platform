import axios from "axios"
export default class {
    AxiosInstance
    constructor() {
        return this.create();
    }

    /**
     * 创建
     */
    create(){
        this.AxiosInstance = axios.create({
        });
        this.request_interceptors();
        this.response_interceptors();
        return this.AxiosInstance;
    }

    /**
     * 请求拦截
     */
    request_interceptors(){
    }

    /**
     * 响应拦截
     */
    response_interceptors(){
    }
}