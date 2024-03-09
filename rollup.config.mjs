import commonjs from "@rollup/plugin-commonjs";
import externals from "rollup-plugin-node-externals";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "build/index.js",
    format: "cjs",
    exports: "named",
  },
  plugins: [externals(), nodeResolve(), commonjs()],
};
