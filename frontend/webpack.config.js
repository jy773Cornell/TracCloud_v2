const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!react-flow-renderer)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
    }
    ,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                ...JSON.stringify(process.env),
                NODE_ENV: JSON.stringify("development"),
                PUBLIC_URL: JSON.stringify('/public'),
            },
        }),
    ],

};