/** @type {import('next').NextConfig} */

export function webpack(config, options) {
    config.module.rules.push({
        test: /\.mp3$/,
        use: {
            loader: "url-loader",
        },
    });
    return config;
}
