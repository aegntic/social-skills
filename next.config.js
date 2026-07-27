// ponytail: in this Next 15.x + App Router setup, `next-flight-css-loader` is the
// only loader chained for `app/globals.css`. Without css-loader + postcss-loader
// in the chain, webpack treats the CSS as a JS module and crashes on `:` (in
// `:root {`). We add a high-priority pre-rule that processes ALL .css imports
// inside `src/app/` through css-loader + postcss-loader so the file ends up
// as a valid JS module exporting CSS strings. This rule fires BEFORE Next's
// internal CSS handling for our own files.
const path = require("path");

const cssLoader = path.resolve("./node_modules/next/dist/build/webpack/loaders/css-loader/src");
const postcssLoader = path.resolve("./node_modules/next/dist/build/webpack/loaders/postcss-loader/src");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  output: "standalone",
  webpack: (config) => {
    // ponytail: prepend a rule that forces every CSS file under src/app/
    // through css-loader + postcss-loader so webpack compiles them as CSS
    // modules rather than trying to parse them as JavaScript. This is the
    // single missing piece in the App Router chain for this project.
    const appCssLoader = {
      test: /\.css$/,
      include: [path.resolve("./src/app")],
      use: [
        {
          loader: cssLoader,
          options: {
            importLoaders: 1,
            modules: false,
            url: false,
            postcss: () => ({
              postcss: require("postcss"),
              postcssWithPlugins: require("postcss")([require("@tailwindcss/postcss")()]),
            }),
          },
        },
        {
          loader: postcssLoader,
          options: {
            postcss: () => ({
              postcss: require("postcss"),
              postcssWithPlugins: require("postcss")([require("@tailwindcss/postcss")()]),
            }),
          },
        },
      ],
    };
    config.module.rules.unshift(appCssLoader);
    return config;
  },
};

module.exports = nextConfig;
