import webpack from "webpack";
import { buildCssLoaders } from "./loaders/buildCssLoaders";
import { BuildOptions } from "./types/config";
import { buildBabelLoader } from "./loaders/buildBabelLoader";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: "file-loader",
      },
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  const babelLoader = buildBabelLoader(options);

  const stylesLoader = buildCssLoaders(options.isDev);

  return [babelLoader, tsLoader, stylesLoader, svgLoader, fileLoader];
}
