import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
const { execSync } = require("child_process");
const { resolve } = require("path");
const { existsSync, mkdirSync } = require("fs");
export class IndexController extends applicationController{
    __dir:string;// 当前项目根目录
    gitDir:string;// git clone 本地存放地址
    gitUrl:string;// git 仓库地址
    constructor() {
        super();
        this.__dir = resolve(__dirname,"../../../../");
        this.gitDir = resolve(this.__dir,"gitDir");
        this.gitUrl = "https://gitlab.zhijiasoft.com";
    }

    /**
     * git 代码拉取测试
     */
    index(){
        if(!existsSync(this.gitDir)){
           mkdirSync(this.gitDir);
        }
        this.gitClone("pc-alert").then(() => {
            this.existsSync("cd pc-alert && git pull").then(()=>{
                this.$_success();
            })
        });
    }

    /**
     * 克隆项目
     * @param packName 包名
     * @param userName 包名所属用户
     */
    gitClone(packName:string, userName:string = "xuyi"){
        return new Promise((resolve1, reject) => {
            if(!existsSync(resolve(this.gitDir,packName))){
                this.existsSync(`git clone ${this.gitUrl}/${userName}/${packName}`)
                resolve1();
            }else {
                resolve1();
            }
        })
    }
    existsSync(command:string){
        console.log(execSync(command,{
            cwd:this.gitDir
        }).toString())
        return Promise.reject();
    }

}