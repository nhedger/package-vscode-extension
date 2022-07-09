import { resolve } from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
    mode: 'production',
    target: 'node',
    entry: resolve(__dirname, 'src', 'main.ts'),
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'action.js',
    },
    externalsPresets: {
        node: true,
    },
    resolve: {
        extensions: ['.ts', '...'],
        alias: {
            // We won't be relying on keytar so it's safe to exclude it.
            'keytar$': false,
        }
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.ts$/,
            }
        ]
    }
};

export default config;
