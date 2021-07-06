const path = require('path')
const webpack = require('webpack')
const express = require('express')
const app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

function getPlugins() {
    let plugins = []
    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // // GitRevision.version()
    // new webpack.DefinePlugin({
    //     APP_VERSION: `"${require('./package.json').version}"`,
    //     GIT_HASH: JSON.stringify('1.2'),
    //     BUILD_DATE: buildDate
    // })

    // 配置压缩
    new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
    })

    //在合并 chunk 时，webpack 会尝试识别出具有重复模块的 chunk，并优先进行合并。任何模块都不会被合并到 entry   chunk 中，以免影响初始页面加载时间。
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
    })

    return plugins
}

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
    chainWebpack:config=>{
        //发布模式
        config.when(process.env.NODE_ENV === 'production',config=>{
            //entry找到默认的打包入口，调用clear则是删除默认的打包入口,add添加新的打包入口
            config.entry('app').clear().add('./src/main.js')
            //使用externals设置排除项
            config.set('externals',{
                vue: 'Vue',
                vuex: 'Vuex',
                echarts: 'echarts',
                'element-ui': 'ElementUI',
                'vue-cookies': 'cookies',
                axios: 'axios',
                'vue-router': 'Router',
                "element-resize-detector": 'elementResizeDetectorMaker'
            })
        })
        //开发模式
        config.when(process.env.NODE_ENV === 'development',config=>{
            config.entry('app').clear().add('./src/main.js')
        })

        // //发布模式
        // config.when(process.env.NODE_ENV === 'production',config=>{
        //     //entry找到默认的打包入口，调用clear则是删除默认的打包入口
        //     //add添加新的打包入口
        //     config.entry('app').clear().add('./src/main.js')
        //
        //     //使用externals设置排除项
        //     config.set('externals',{
        //         vue: 'Vue',
        //         echarts: 'echarts',
        //         vuex: 'Vuex',
        //         // axios:'axios',
        //         'element-ui': 'ElementUI',
        //         // nprogress:'NProgress',
        //         // 'vue-quill-editor':'VueQuillEditor'
        //     })
        // })
    },
    //configureWebpack: () => {},
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production'
            // config.entry('app').clear().add('./src/main-prod.js');
            // config.plugin('html').tap(args => {
            //     args[0].isProd = true;
            //     return args
            // });
            // config.set('externals', {
            //     vue: 'Vue',
            //     // 'vue-router': 'VueRouter',
            //     // axios: 'axios',
            //     // lodash: '_',
            //     // echarts: 'echarts',
            //     // nprogress: 'NProgress',
            //     // 'vue-quill-editor': 'VueQuillEditor'
            // })
        } else {
            config.mode = 'development'
            // config.entry('app').clear().add('./src/main-dev.js');
            // //定制开发模式标题
            // config.plugin('html').tap(args => {
            //     args[0].isProd = false;
            //     return args
            // })
        }
        Object.assign(config, {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                    '@v': path.resolve(__dirname, './src/components/views')
                }
            },
            // plugins: getPlugins()
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
            postcss: {},
            less: {
                javascriptEnabled: true// less 配置
            }
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
        public: '10.20.39.102:8085',
        // public:'localhost:8080',
        host: '0.0.0.0',
        port: 8085,
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
                // target: 'http://localhost:5000/',
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