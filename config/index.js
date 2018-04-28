// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
    // test
    // var requestUrl = 'http://zxdata.jcloud.com:8080'
    var requestUrl = 'https://ultrav-console.jcloud.com'
    // pre
    // var requestUrl = 'https://xdata.jcloud.com/exp'

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        _share: path.resolve(__dirname, '../dist/_share.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 80,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/report': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/sheet': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/folder': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/chart': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/database': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/share': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/system': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/bigScreen': {
                target: requestUrl,
                changeOrigin: true,
            },
            '/layer': {
                target: requestUrl,
                changeOrigin: true,
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}