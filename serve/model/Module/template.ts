import PublicModel, {$sqlFieldConfigType, PublicModelInterface} from "../PublicModel";

export default class extends PublicModel implements PublicModelInterface{
    $TableName = "template";
    $sqlFieldConfig:$sqlFieldConfigType = {
        id:{varchar:"(253)", NOT:'NULL', DEFAULT:`'1'`, COMMENT:`'模版id'`},
        name:{varchar:"(255)", COMMENT:`'模块名称'`,},
        m_id:{varchar:"(255)", COMMENT:`'模块id'`,},
        description:{varchar:"(255)", COMMENT:`'描述'`,},
    };
    'CHARACTER SET' = 'utf8';
    COLLATE = `utf8_unicode_ci`;
    COMMENT =`'模板表'`;
}