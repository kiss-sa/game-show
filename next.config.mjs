/** @type {import('next').NextConfig} */

export function webpack(config, options) {
    config.module.rules.push({
        test: /\.mp3$/,
        use: {
            loader: "url-loader",
        },
    });
    config.module.rules.push({
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      });
    return config;
}
