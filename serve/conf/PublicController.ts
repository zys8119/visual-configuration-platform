/**
 * 全局控制器方法扩展注入
 * 这里声明的方法或属性，将会被所有应用调用，开放开发者自由封装
 *
 * 备注：Interceptor 是独占字段，不建议当作控制器方法使用，
 * 该字段存在，且类型为方法时，将被默认为拦截器调用
 */
import {ControllerInitDataOptions} from "../UnityFrontUtils/typeStript";
import { resolve } from "path";
import {readdirSync, statSync} from "fs";
class Interceptor implements ControllerInitDataOptions{
    readdirSync(path: string):any {
        let resUlt = [];
        resUlt = resUlt.concat(readdirSync(path).map(name=>{
            const childrenPath = resolve(path,name);
            const is_file = statSync(childrenPath).isFile();
            const type = is_file ? "file" : "directory";
            let children = [];
            if(!is_file){
                children = this.readdirSync(childrenPath);
            }
            return {
                name:name,
                path:childrenPath,
                children,
                type,
                is_file,
            }
        }));
        return resUlt;
    }

    $_success(msg?: any, sendData?: any, code?: number): void {
    }
    $_error(msg?: any, sendData?: any, code?: number): void {
    }

    /**
     * Interceptor 全局拦截器注入
     * @constructor
     * @return { Promise } then 执行 、 catch 终止
     */
    Interceptor(){
        return Promise.resolve();
    }

    constructor() {
        // return true;
    }
};


export default Interceptor;
