const express = require('express')
var compression = require('compression')
var app = express()
app.use(compression())
const path = require('path')
const webpack = require('webpack')
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
    publicPath: './',//new
    // 输出文件目录
    outputDir: 'dist',
    //outputDir: '../dist',
    // eslint-loader 是否在保存的时候检查
    //assetsDir: 'assets',//静态资源目录
    assetsDir: 'dist',
    lintOnSave: false,//是否开启eslint
    runtimeCompiler: false,

    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    //chainWebpack: () => {},
    chainWebpack: config => {
        //发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            //entry找到默认的打包入口，调用clear则是删除默认的打包入口,add添加新的打包入口
            config.entry('app').clear().add('./src/main.js')
            //使用externals设置排除项
            config.set('externals', {
                vue: 'Vue',
                vuex: 'Vuex',
                echarts: 'echarts',
                'element-ui': 'ElementUI',
                'vue-cookies': 'VueCookies',
                axios: 'axios',
                'vue-router': 'VueRouter',
            })
        })
        //开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main.js')
        })
    },
    //configureWebpack: () => {},
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production'
            config.plugins.push(
                new CompressionWebpackPlugin({
                    asset: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        } else {
            config.mode = 'development'
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
        compress: true,
        // host: 'localhost',
        // public:'localhost:8080',
        public: 'http://124.71.45.84:8080',
        host: '0.0.0.0',
        port: 8080,
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
                target: 'http://124.71.45.84:5000/',
                // target: 'http://10.20.39.102:5000/',
                changeOrigin: true, // 允许websockets跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        } // 代理转发配置，用于调试环境
    },

    // 第三方插件配置
    pluginOptions: {
        // ...
    },
    // build: {
    //     index: path.resolve(__dirname, '../dist/index.html'),
    //     assetsRoot: path.resolve(__dirname, '../dist'),
    //     assetsSubDirectory: 'static',
    //     assetsPublicPathL: './',
    // }
}