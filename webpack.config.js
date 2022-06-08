const path = require('path');
// require('dotenv').config()
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackDeployPlugin = require("html-webpack-deploy-plugin");

// const defineConfig =  {
//     'clean-vn': ['./src/scss/pages/clean-vn/main.scss'],
//     'loli': ['./src/scss/pages/loli/main.scss'],
//     'choi-chu': ['./src/scss/pages/choi-chu/main.scss'],
// }
// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = () => {

    const env = require("dotenv").config({ path: __dirname + "/.env" });
    const template = env.parsed.TEMPLATE_MANE;
    // Path to your entry point. From this file Webpack will begin his work
    return {
        entry: [
            `./src/scss/pages/${template}/main.scss`,
        ],

        // Path and filename of your result bundle.
        // Webpack will bundle all JavaScript into this file
        output: {
            path: path.resolve(__dirname, 'public/' + template),
            filename: `assets/main.js`
        },
        devServer: {
            hot: true,
            watchFiles: ['src/**/*']
        },
        watchOptions: {
            ignored: /node_modules/
        },
        // Default mode for Webpack is production.
        // Depending on mode Webpack will apply different things
        // on final bundle. For now we don't need production's JavaScript
        // minifying and other thing so let's set mode to development
        mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env"]
                            ]
                        }
                    }
                },
                {
                    // Apply rule for .sass, .scss or .css files
                    test: /\.(sa|sc|c)ss$/,

                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                        // {
                        //     loader: "postcss-loader"
                        // },
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                                sourceMap: true,
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
                    use: {
                        loader: 'url-loader?limit=100000'
                    }
                },
                {
                    // Now we apply rule for images
                    // test: /\.(png|jpe?g|gif|svg)$/,
                    // use: [
                    //     {
                    //         // Using file-loader for these files
                    //         loader: "file-loader",

                    //         // In options we can set different things like format
                    //         // and directory to save
                    //         options: {
                    //             outputPath: 'images'
                    //         }
                    //     }
                    // ]
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                      {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[hash].[ext]',
                          publicPath: 'assets',
                          outputPath: 'assets/img'
                        }
                      }
                    ]
                },
                {
                    // Apply rule for fonts files
                    test: /\.(woff|woff2|ttf|otf|eot)$/,
                    use: [
                        {
                            // Using file-loader too
                            loader: "file-loader",
                            options: {
                                outputPath: 'fonts'
                            }
                        }
                    ]
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `./assets/css/main.css`
            }),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `src/pages/${template}/main.html`),
                filename: `index.html`,
                minify: false,
            }),
            new HtmlWebpackDeployPlugin({
                asets: {
                  copy: [{ from: path.resolve(__dirname, `src/pages/${template}/assets`) }],
                },
                useAssetsPath: true,
                // addAssetsPath: assetPath => path.join('/', assetPath),
              })
        ],
        externals: {
            jquery: 'jQuery'
        }
    }
};
