// ES6에서는 import로 사용되며 모듈을 불러온다.
var webpack = require('webpack');

// 아래 객체를 모듈로 내보겠다.
module.exports = {
    // 작업 경로
    entry: './src/index.js',
    
    // 배포 경로
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        // 핫로더 실행 옵션
        hot: true,
        // 핫리로딩에서 필요한 웹팩 DEV-server의 클라이언트를 번들에 같이 넣어준다.
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        // index 파일의 위치
        contentBase: __dirname + '/public/',
    },

    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }               
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}