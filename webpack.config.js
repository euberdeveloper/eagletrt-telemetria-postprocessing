const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DtsBundleWebpack = require('dts-bundle-webpack');

const libConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'source', 'lib', 'index.ts')
    },

    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                          compiler: 'ttypescript'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: '@eagletrt/telemetria-postprocessing',
            main: 'dist/lib/index.d.ts',
            out: '../../bundled/lib/index.d.ts'
        }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'lib'),
        filename: 'index.js',
        library: '@eagletrt/telemetria-postprocessing',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const commandsConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'source', 'bin', 'commands', 'index.ts')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                          compiler: 'ttypescript'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DtsBundleWebpack({
            name: '@eagletrt/telemetria-postprocessing/bundled/bin/commands',
            main: 'dist/bin/commands/index.d.ts',
            out: '../../../bundled/bin/commands/index.d.ts'
        }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    externals: [{
        // @/lib
        '../../lib/index': {
            amd: './commands/index.js',
            root: '@eagletrt/telemetria-postprocessing',
            commonjs: './commands/index.js',
            commonjs2: './commands/index.js'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'bin', 'commands'),
        filename: 'index.js',
        library: '@eagletrt/telemetria-postprocessing/bundled/bin/commands',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

const binConfig = {
    target: 'node',
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        index: path.join(__dirname, 'source', 'bin', 'index.ts'),
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
        new webpack.EnvironmentPlugin(['IS_WEBPACK'])
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                          compiler: 'ttypescript'
                        }
                    },
                    {
                        loader: 'shebang-loader'
                    }
                ]
            }
        ]
    },
    externals: [{
        // @/bin/commands
        './commands/index': {
            amd: './commands/index.js',
            root: '@eagletrt/telemetria-postprocessing/bundled/bin/commands',
            commonjs: './commands/index.js',
            commonjs2: './commands/index.js'
        }
    }, nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'bundled', 'bin'),
        filename: 'index.js',
        library: '@eagletrt/telemetria-postprocessing/bundled/bin',
        libraryTarget: 'umd',
        globalObject: 'this',
        umdNamedDefine: true,
    }
};

module.exports = [
    libConfig,
    commandsConfig,
    binConfig
];