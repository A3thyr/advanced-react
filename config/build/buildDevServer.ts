import { BuildOptions } from "./types/config";
import { Configuration as DevServerConfiguraion } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguraion {
  return {
    port: options.port,
    open: false,
    historyApiFallback: true,
    hot: true,
  };
}
