const path = require('path')
const express = require('express')
const app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)


module.exports = {
    publicPath: '/',//new
    // 输出文件目录
    outputDir: 'dist',
    //outputDir: '../dist',
    // eslint-loader 是否在保存的时候检查
    //assetsDir: 'assets',//静态资源目录
    assetsDir: 'dist',
    assetsDir: 'dist',
    //assetsDir: './dist',
    lintOnSave: false,//是否开启eslint
    runtimeCompiler: false,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    //chainWebpack: () => {},
    chainWebpack: (config) => {},//update
    //configureWebpack: () => {},
    configureWebpack: (config) => {
        if(process.env.NODE_ENV === 'production'){
            config.mode = 'production'
        } else {
            config.mode = 'development'
        }
        Object.assign(config, {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/component'),
                    '@v': path.resolve(__dirname, './src/views')
                }
            }
        })
    },//update
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    //productionSourceMap: true,
    productionSourceMap: false,//update
    // css相关配置
    css: {
        //是否使用css分离插件 ExtractTextPlugin
        extract: true,
        ///开启 CSS source maps?
        sourceMap: false,
        //css预设器配置项
        loaderOptions: {
            css: {},
            postcss: {}
        },
        //启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,//new
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    //dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        //open: true,//自动弹出浏览器页面
        open: process.platform === 'darwin',
        // host: 'localhost',
        public:'10.20.39.102:8080',
        host: '0.0.0.0',
        port: 8080,
        //port: 8022,
        https: false,
        overlay: {//new 错误、警告在页面弹出
            warning: true,
            errors: true
        },
        // hotOnly: false,
        hot: true,
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        disableHostCheck: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:5000',
        //         changeOrigin: true,
        //         ws: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }, // 设置代理
        //proxy: null,
        proxy: {
            '/api': {
                target: 'http://10.20.39.102:5000/',
                changeOrigin: true, // 允许websockets跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        } // 代理转发配置，用于调试环境
    },
    // plugins: {//new
    //     'autoprefixer': {browsers: 'last 5 version'}
    // },
    // before(app) {
    //         //app.get('/test', (req, res) => {
    //         //     res.json({
    //         //         errno: 0,
    //         //         data: test
    //         //     })
    //         // })
    //     }
    // },
    // 第三方插件配置
    pluginOptions: {
        // ...
    },

}