const path = require("path")

module.exports = {
  entry: "./src/index.mjs",
  mode: "production",
  target: "node",
  experiments: {
    topLevelAwait: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
}
