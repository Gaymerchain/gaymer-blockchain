var env = process.env.WEBPACK_ENV;
var libraryName = "library";
var webpack = require("webpack");

try {
  require("babel-polyfill");
} catch (e) {
  if (
    e.message.indexOf("only one instance of babel-polyfill is allowed") === -1
  ) {
    console.error(e);
  }
}

var config = {
  entry: __dirname + "/src/index.js",
  devtool: "source-map",
  target: "node",
  node: {
    process: false
  },
  output: {
    path: __dirname + "/lib",
    filename: env === "build" ? libraryName + ".min.js" : libraryName + ".js",
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "this"
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: env === "build" ? true : false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = config;
