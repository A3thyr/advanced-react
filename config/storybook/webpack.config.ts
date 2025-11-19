import path from "path";
import { DefinePlugin, RuleSetRule } from "webpack";
import { WebpackConfiguration } from "webpack-dev-server";
import { buildCssLoaders } from "../../config/build/loaders/buildCssLoaders";
import { buildSvgLoader } from "../../config/build/loaders/buildSvgLoader";
import { BuildPaths } from "../../config/build/types/config";

export default ({ config }: { config: WebpackConfiguration }) => {
  const paths: BuildPaths = {
    build: "",
    entry: "",
    html: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };

  config.resolve.modules.push(paths.src);
  config.resolve.extensions.push(".ts", ".tsx");

  config.plugins.push(
    new DefinePlugin({
      __IS_DEV__: true,
      __API___: "",
    })
  );

  // eslint-disable-next-line no-param-reassign
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }
    return rule;
  });

  config.module.rules.push(buildSvgLoader());
  config.module.rules.push(buildCssLoaders(true));

  return config;
};
