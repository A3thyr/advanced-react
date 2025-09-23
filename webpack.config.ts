import webpack from "webpack";
import { buildWebpackConfing } from "./config/build/buildWebpackConfig";
import { BuildPaths } from "./config/build/types/config";
import path from "path";

export const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
};

const mode = "development";

const isDev = mode === "development";

const config: webpack.Configuration = buildWebpackConfing({
  mode: "development",
  paths,
  isDev,
});

export default config;
