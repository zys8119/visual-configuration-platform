import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "module";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{varchar:"(253)", NOT:'NULL', DEFAULT:`'1'`, COMMENT:`'模块id'`},
        gitUrl:{varchar:"(255)", COMMENT:`'仓库地址'`,},
        userName:{varchar:"(255)", COMMENT:`'所属者'`,},
        packName:{varchar:"(255)", COMMENT:`'包名'`,},
        branchName:{varchar:"(255)", COMMENT:`'当前本地分支'`,},
        synStatus:{varchar:"(255)", COMMENT:`'同步状态'`,},
        del:{varchar:"(255)", COMMENT:`'是否删除(1 未删除、2 删除)'`, DEFAULT:`'1'`},
    };
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'模块表'`;
}