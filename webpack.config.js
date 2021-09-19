const path = require('path');

module.exports = (env, argv) => [{
    entry: {
        popup: './src/popup.js',
        options: './src/options.js',
        background: './src/background.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    devtool: argv.mode === 'development' ? 'inline-source-map' : false,
    performance: {
        maxAssetSize: 600 * 1024, // default: 250 KB
        maxEntrypointSize: 1.2 * 1024 * 1024 // default: 250 KB
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         maxInitialRequests: Infinity,
    //         minSize: 0,
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: module => {
    //                     const expression = /[\\/]node_modules[\\/](.*?)([\\/]|$)/;
    //                     while (expression.test(module.issuer.context)) module = module.issuer; // find top level issuer
    //                     const name = module.context.match(expression)[1]; // ./node_modules/office-ui-fabric-react/lib/Dropdown -> office-ui-fabric-react
    //                     return `module.${name.replace('@', '')}`; // result: "module.react.js"
    //                 }
    //             }
    //         }
    //     }
    // }
}];