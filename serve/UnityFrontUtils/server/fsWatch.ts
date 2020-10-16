import "../typeStript"
const fs = require("fs");
import { ServerConfig } from "../config"
import Uitls from "../utils"
export default class fsWatch {
    constructor(){
        ServerConfig.fsWatch.forEach(filePath=>{
            let options = {
                recursive:false
            };
            switch (filePath.type) {
                case "directory":
                    options.recursive = true;
                    break;
                case "file":
                    break;
            }
            fs.watch(filePath.path,options, (eventType, filename) => {
                ServerConfig.fsWatch.forEach(filePath=>{
                    if(filePath.type == "file"){
                        delete require.cache[filePath.path];
                        return;
                    }
                    Uitls.getJsonFiles(filePath.path,(DirFilePath)=>{
                        if(fs.existsSync(DirFilePath)){
                           delete require.cache[DirFilePath];
                        }
                    })
                });
            });
        });
    }
}
