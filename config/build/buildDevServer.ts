import { Configuration as DevServerConfiguraion } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

export function buildDevServer(options: BuildOptions): DevServerConfiguraion {
  return {
    port: options.port,
    open: false,
    historyApiFallback: true,
    hot: true,
  };
}
