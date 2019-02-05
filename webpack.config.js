const path = require('path'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");

const browserConfig = {
    entry: './src/index.js',
    output: {
        path: path.resolve('build/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                filename: 'vendors.js',
                chunks: 'all'
            }
            // styles: {
            //   name: 'style',
            //   filename: 'style.js',
            //   test:  /\.s?css$/,
            //   chunks: 'all',
            //   enforce: true
            // }
        }
    }
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        inline: true,
        port: 3000,
        publicPath: '/',
        proxy: {
            '/': 'http://127.0.0.1:8080/'
          }
      },
    plugins: [
              new MiniCssExtractPlugin({
                filename: "style.css",
                chunkFilename: "[name].css"
              })
            ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname,'src'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                }
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     loader: 'url-loader'
                
            // },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                  ],
            }
        ]
    }
}


const serverConfig = {
    entry: "./server.js",
    target: "node",
    node: {
        __dirname: false
    },
    output: {
      path: path.resolve(__dirname),
      filename: "index.js",
      libraryTarget: "commonjs2"
    },
    //devtool: "cheap-module-source-map",
    module: {
      rules: [
        // {
        //     test: /\.(png|jpg|gif)$/,
        //     loader: 'url-loader'
            
        // },
        {
            test: /\.(sa|sc|c)ss$/,
            loader: 'css-loader/locals'
        },
        {
            test: /js$/,
            exclude: /(node_modules)/,
            loader: "babel-loader",
            query: { presets: ['@babel/preset-env','@babel/preset-react'] }
        }
      ]
    }
};

module.exports = browserConfig;