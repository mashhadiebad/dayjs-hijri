import filesize from "rollup-plugin-filesize";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/hijri-day.cjs.js",
      format: "cjs",
      plugins: [terser()],
    },
    {
      file: "dist/hijri-day.esm.js",
      format: "esm",
      plugins: [terser()],
    },
    {
      file: "dist/hijri-day.umd.js",
      format: "umd",
      name: "hijri-day",
      plugins: [terser()],
    },
  ],
  externals: ["dayjs"],
  plugins: [
    terser(), // Minify the code
    filesize({
      showBrotliSize: true,
      showGzippedSize: true,
    }),
  ],
};
