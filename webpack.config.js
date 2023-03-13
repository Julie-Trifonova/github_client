const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const webpack = require('webpack');
const DefinePlugin = require('define-variable-webpack-plugin');

const getSettingsForStyles = (withModules = false) => {
    return [MiniCssExtractPlugin.loader,
        !withModules ? 'css-loader' : {
            loader: 'css-loader',
            options: {
                modules: {
                    localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
                }
            }
        }, {
        loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer']
                }
            }
        },
        'sass-loader']
}

module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: '[name]-[hash].css'
            }
        ),
        new TsCheckerPlugin(),
        // new DefinePlugin({
        //     "process.env.NODE_ENV": JSON.stringify("development"),
        //     "process.env.REACT_APP_MYAPP": JSON.stringify(process.env.REACT_APP_MYAPP)
        // }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            'typeof window': JSON.stringify('object'),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            },
        })
    ].filter(Boolean),
    module:
        {
            rules: [
                {
                    test: /\.module\.s?css$/,
                    use: getSettingsForStyles(true)
                },
                {
                    test: /\.s?css$/,
                    exclude: /\.module\.s?css$/,
                    use: getSettingsForStyles()
                },
                {
                    test: /\.[tj]sx?$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|svg|jpg)$/,
                    type: "asset",
                    parser: {
                        dataUrlCondition: {
                            maxSize: 10 * 1024
                        }
                    }
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    // use: ['url-loader?limit=100000']
                    use: 'file-loader'
                },
                // {
                //     test: /\.(woff|woff2|ttf|otf)$/,
                //     loader: 'file-loader',
                //     include: [/fonts/],
                //
                //     options: {
                //         name: '[hash].[ext]',
                //         outputPath: 'css/',
                //         publicPath: url => '../css/' + url
                //     }
                // },
            ]
        },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            components: path.join(srcPath, 'components'),
            config: path.join(srcPath, 'config'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
            models: path.join(srcPath, 'models'),
            store: path.join(srcPath, 'store'),
        }
    },
    devServer:{
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        historyApiFallback: true
    }
}