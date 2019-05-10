const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const workboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    entry: {
        landingPage: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        },
            {
                test: /font-awesome\.config\.js/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'font-awesome-loader'}
                ]
            }, {
                test: /\.(woff(2)?|otf|ttf|eot|svg|gif|png)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }]
    },
    resolve: {
        alias: {
            'jquery': require.resolve('jquery')
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            workbox: 'workbox-sw'
        }),
        new workboxPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            exclude: [/\.(?:png|jpg|jpeg|svg|gif|png)$/],

            // Define runtime caching rules.
            runtimeCaching: [{
                // Match any request ends with .png, .jpg, .jpeg or .svg.
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif|png)$/,

                // Apply a cache-first strategy.
                handler: 'cacheFirst',

                options: {
                    // Use a custom cache name.
                    cacheName: 'images',

                    // Only cache 10 images.
                    expiration: {
                        maxEntries: 10
                    }
                }
            }]
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new MinifyPlugin(),
        new webpack.SourceMapDevToolPlugin({})
    ]
};