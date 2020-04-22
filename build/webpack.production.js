const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = [
    {
        mode: 'production',

        entry: {
            'fx-table': './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, '../lib'),

            filename: '[name].min.js',

            library: 'fx-table',

            libraryTarget: 'umd'
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
                    test: /\.vue$/,
                    loader: "vue-loader"
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify('production')
            }),

            new VueLoaderPlugin(),

            new ExtractTextPlugin({
                filename: '[name].min.css'
            })
        ],

        externals: {
            vue: 'vue',

            "element-ui": 'element-ui',

            axios: 'axios'
        }
    }
]