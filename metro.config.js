const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")
const path = require("path")

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "app"),
  "assets": path.resolve(__dirname, "assets"),
}

config.transformer.getTransformOptions = async () => ({
  transform: {
    inlineRequires: true,
  },
})

config.resolver.sourceExts.push("cjs")

module.exports = withNativeWind(config, { input: "./app/global.css" })
