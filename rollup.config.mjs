import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "build/index.js",
    format: "cjs",
    exports: "named",
  },
  plugins: [json(), nodeResolve(), commonjs()],
};
