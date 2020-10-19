module.exports = {
    pages:{
        index: {
            title:"前端可视化配置平台",
            entry: 'src/main.js',
        }
    },
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('less').oneOfs.store;
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: './src/assets/less/constant.less',
                })
                .end()
        })
    },
}