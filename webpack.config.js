const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  return {
    output: {
      publicPath:
        argv.mode === "development"
          ? "http://localhost:3000/"
          : "https://host-mf-colorpicker.netlify.app/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          colorPicker:
            argv.mode === "development"
              ? "mf_colorPicker@http://localhost:3001/remoteEntry.js"
              : "mf_colorPicker@https://color-picker-mf.netlify.app/remoteEntry.js",
          colorList:
            argv.mode === "development"
              ? "mf_colorList@http://localhost:3002/remoteEntry.js"
              : "mf_colorList@https://colorlist-mf.netlify.app/remoteEntry.js",
        },
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
