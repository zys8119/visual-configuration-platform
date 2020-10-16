import "../typeStript"
import {ServerConfig, TimingTaskQueue, mysqlConfig} from "../config"
import webSocketServe from "../webSocket/serve"
import sqlModelAuto from "./sqlModelAuto"
const http = require("http");
const app = require('./app');
const ncol = require('ncol');
// sqlModelAuto
if(mysqlConfig.sqlModelAuto){
    new sqlModelAuto();
}
//定时任务
if(TimingTaskQueue && ServerConfig.TimingTaskQueue  && TimingTaskQueue.TaskQueue){
    setInterval(TimingTaskQueue.TaskQueue,TimingTaskQueue.TaskQueueTime);
}
//创建服务
http.createServer(app).listen({
    host: ServerConfig.host,
    port: ServerConfig.port,
});
ncol.info(`Server running at http://${ServerConfig.host || "localhost"}:${ServerConfig.port}/`);
if(ServerConfig.ws_port){
    new webSocketServe();
}

