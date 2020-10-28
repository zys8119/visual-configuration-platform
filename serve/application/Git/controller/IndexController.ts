import {applicationController} from "../../../UnityFrontUtils/controller/applicationController";
const { execSync } = require("child_process");
const { resolve } = require("path");
const { existsSync, mkdirSync, readFileSync, readdirSync } = require("fs");
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
     * 删除模块
     */
    deleteModule(){
        new this.$sqlModel.Module().update({
            ...this.$_body,
            del:2,
        }).where({id:this.$_body.id}).query().catch(err=>this.$_error(err)).then(()=>this.$_success());
    }

    /**
     * 添加模块
     */
    addModule(){
        new this.$sqlModel.Module().insert({
            ...this.$_body,
            id:Date.now()
        }).query().catch(err=>this.$_error(err)).then(()=>this.$_success());
    }

    /**
     * 更新模块
     */
    updateModule(){
        new this.$sqlModel.Module().update({
            ...this.$_body,
        }).where({
            id:this.$_body.id,
        }).query().catch(err=>this.$_error(err)).then(()=>this.$_success());
    }

    /**
     * 获取模块列表
     */
    gitModuleList(){
        new this.$sqlModel.Module().getPage({
            TableName:"module",
        },function (){
            this.where({
                del:2,
            },null,"!=")
        })
            .then(res=>{
                const gitDir = this.readdirSync(this.gitDir);
                this.$_success(res.map(e=>{
                    if(e.synStatus === '2'){
                        e.synStatus = gitDir.find(d=>d.name === e.userName && d.children.find(dd=>dd.name === e.packName)) ? '2':'1';
                    }
                    return e;
                }));
            })
            .catch(err=>this.$_error())
    }

    /**
     * 获取模块分支
     */
    gitModuleBranch(){
        this.initData().then(()=>{
            this.getBranch().then(res=>{
                this.$_success(res.filter(e=>e.origin));
            });
        })
    }

    /**
     * 切换模块分支
     */
    checkoutModuleBranch(){
        this.initData().then(()=>{
            this.checkout(this.$_body.branchName,this.$_body.branchNameType === 1).then(()=>{
                new this.$sqlModel.Module().update({
                    branchName:this.$_body.branchName,
                    version:`'${this.getPackageJson().version}'`
                }).where({id:this.$_body.id}).query().catch(err=>this.$_error(err)).then(()=>this.$_success());
            })
        })
    }

    /**
     * 初始化数据
     */
    initData(){
        this.gitUrl = this.$_body.gitUrl || this.gitUrl;
        this.userName = this.$_body.userName || this.userName;
        this.branchName = this.$_body.branchName || this.branchName;
        this.packName = this.$_body.packName || this.packName;
        this.packSrc = `${this.gitDir}/${this.userName}/${this.packName}`;
        return Promise.resolve()
    }

    /**
     * 同步模块
     */
    synModule(){
        this.initData().then(()=>{
            this.index().then(()=>{
                this.getBranch().then(res=>{
                    const packageJson  = this.getPackageJson();
                    new this.$sqlModel.Module().update({
                        synStatus:"2",
                        branchName:(res.find(e=>e.current) || {}).origin,
                        version:`'${packageJson.version}'`
                    }).where({
                        id:this.$_body.id,
                    }).query().catch(err=>this.$_error(err)).then(()=>this.$_success());
                })
            });
        });
    }

    /**
     * 获取PackageJson
     */
    getPackageJson(){
        return JSON.parse(readFileSync(resolve(this.packSrc,"./package.json"),"utf8"));
    }

    /**
     * git 拉取代码
     */
    index(){
        return new Promise((resolve1, reject) => {
            if(!existsSync(resolve(this.packSrc,"../"))){
                mkdirSync(resolve(this.packSrc,"../"));
            }
            this.gitClone(this.packName, this.userName).then(() => {
                this.pull().then(()=>{
                    resolve1();
                })
            });
        })
    }

    /**
     * 切换分支
     */
    checkout(branchName:string = "master", bool){
        return new Promise(resolve1 => {
            try {
                let command = `git checkout release -b ${branchName} origin/${branchName}`;// 创建并切换
                if(bool){
                    command = `git checkout ${branchName}`; // 切换
                }
                this.existsSyncDir(command).then(res=>{
                    if(bool){
                        this.pull(branchName).then(()=>{
                            resolve1();
                        })
                    }
                })
            }catch (err){
                if(err.message.indexOf("already exists.")){
                    this.checkout(branchName, true).then(()=>{
                        resolve1();
                    });
                }
            }
        })
    }

    deleteBranch(branchName:string = "wzh-h5"){
        try {
            this.existsSyncDir(`git branch -d ${branchName}`).then(res=>{
                this.$_success();
            })
        }catch (e){
            this.$_success();
        }
    }

    /**
     * 获取分支列表
     */
    getBranch(){
        return new Promise((resolve1, reject) => {
            this.existsSyncDir("git remote update origin --prune").then(()=>{
                this.existsSyncDir("git branch -a").then(res=>{
                    resolve1(res
                        .split("\n")
                        .map(e=>
                            e.replace(/^\s*remotes\//img,"")
                                .split("/")).map(e=>{
                            let result = {
                                current:false,
                            };
                            let k = e[0].replace(/^\s*/,"");
                            let val = e[1];
                            if(e.length === 3 && val.indexOf("->") > -1){
                                val = e[2];
                            }
                            if(e.length === 1){
                                result["origin"] = k;
                                if(k.indexOf("*") === 0){
                                    result["origin"] = k.replace(/\*\s*/,"");
                                    result["current"] = true;
                                }
                                result["type"] = 1;
                                result["type_str"] = "本地分支";
                            }else {
                                result[k] = val;
                                result["type"] = 2;
                                result["type_str"] = "远程分支";
                            }

                            return result;
                        }))
                });
            });
        })
    }

    pull(branchName?:string){
        return this.existsSyncDir(`git pull origin ${branchName || this.branchName}`);
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