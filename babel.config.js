/** @type {import("@babel/core").TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./app",
            "assets": "/assets",
          },
        },
      ],
    ],
  }
}
