import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
const { execSync } = require("child_process");
const { resolve } = require("path");
const { existsSync, mkdirSync } = require("fs");
export class IndexController extends applicationController{
    __dir:string = resolve(__dirname,"../../../../");// 当前项目根目录
    gitDir:string = resolve(this.__dir,"gitDir");// git clone 本地存放地址
    gitUrl:string = "https://gitlab.zhijiasoft.com" ;  // git 仓库地址
    userName:string = "xuyi";
    packName:string = "npc-router";
    branchName:string = "master";
    packSrc:string;
    constructor() {
        super();
        this.packSrc = `${this.gitDir}/${this.userName}/${this.packName}`
    }

    /**
     * git 拉取代码
     */
    index(){
        if(!existsSync(resolve(this.packSrc,"../"))){
           mkdirSync(resolve(this.packSrc,"../"));
        }
        this.gitClone(this.packName, this.userName).then(() => {
            this.pull().then(()=>{
                this.$_success();
            })
        });
    }

    /**
     * 切换分支
     */
    checkout(branchName:string = "wzh-h5", bool){
        try {
            let command = `git checkout release -b ${branchName} origin/${branchName}`;// 创建并切换
            if(bool){
                command = `git checkout ${branchName}`; // 切换
            }
            this.existsSyncDir(command).then(res=>{
                console.log(bool,command)
                if(bool){
                    this.pull(branchName).then(()=>{
                        this.$_success();
                    })
                }
            })
        }catch (err){
            if(err.message.indexOf("already exists.")){
                this.checkout(branchName, true);
            }
        }

    }

    getBranch(){
        this.existsSyncDir("git remote update origin --prune").then(()=>{
            this.existsSyncDir("git branch -a").then(res=>{
                console.log(res
                    .split("\n")
                    .map(e=>e.replace(/^\s*remotes\//img,"").split("/"))
                )
                this.$_success();
            });
        });
    }

    pull(branchName?:string){
        return this.existsSyncDir(`git pull origin/${branchName || this.branchName}`);
    }

    /**
     * 克隆项目
     * @param packName 包名
     * @param userName 包名所属用户
     */
    private gitClone(packName:string, userName:string){
        return new Promise((resolve1, reject) => {
            if(!existsSync(resolve(this.packSrc,"../",packName))){
                this.existsSync(`git clone ${this.gitUrl}/${userName}/${packName}`)
                resolve1();
            }else {
                resolve1();
            }
        })
    }

    /**
     * 执行命令
     * @param command
     * @param options
     */
    private existsSync(command:string, options:object = {}){
        const outStr = execSync(command,{
            cwd:resolve(this.packSrc,"../"),
            ...options,
        }).toString()
        console.log(outStr)
        return Promise.resolve(outStr);
    }

    /**
     * 包目录执行命令
     * @param command
     */
    private existsSyncDir(command:string){
        return this.existsSync(command,{
            cwd:this.packSrc,
        });
    }

}