import { SqlUtilsOptions } from "../UnityFrontUtils/typeStript";
import {PublicModelInterface} from "./PublicModel";

export interface SqlModel {
    [key:string]:SqlModelTable;
    Module:SqlModelTable;
    Template:SqlModelTable;
}

export interface  SqlModelTable extends SqlUtilsOptions{
    new (optionsConfig?:object,isEnd?:boolean):SqlUtilsOptions & PublicModelInterface;
}
