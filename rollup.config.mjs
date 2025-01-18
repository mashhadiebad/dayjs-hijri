import terser from "@rollup/plugin-terser";

export default {
  input: 'src/plugin.js',
  output: [
    {
      file: 'dist/hijri-day.esm.js',
      format: 'esm',
      globals: {
        'dayjs/locale/ar.js': 'dayjsLocaleAr',
        'dayjs/locale/en.js': 'dayjsLocaleEn'
      }
    },
    {
      file: 'dist/hijri-day.cjs.min.js',
      format: 'cjs',
      globals: {
        'dayjs/locale/ar.js': 'dayjsLocaleAr',
        'dayjs/locale/en.js': 'dayjsLocaleEn'
      }
    },
    {
      file: 'dist/hijri-day.umd.min.js',
      format: 'umd',
      name: 'HijriDay',
      globals: {
        'dayjs/locale/ar.js': 'dayjsLocaleAr',
        'dayjs/locale/en.js': 'dayjsLocaleEn'
      }
    }
  ],
  plugins: [terser()],
  external: ['dayjs/locale/ar.js', 'dayjs/locale/en.js']
};