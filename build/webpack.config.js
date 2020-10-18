const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',

    entry: {
        demo: './demo/index.js'
    },

    output: {
        path: path.resolve(__dirname, '../dist'),

        publicPath: 'dist/',

        filename: '[name].js'
    },

    resolve: {
        extensions: [".js", ".vue", ".json"],
        // modules: [path.resolve(__dirname, "../node_modules")],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader'
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "../demo"),
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000/'
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('development')
        }),

        new VueLoaderPlugin()
    ],

    // optimization:{
    //     minimize:true
    // },
}