module.exports = {
  output: {
    fileName: 'hijriday.[format][min].js',
    moduleName: 'hijriday',
    format: [
      'cjs-min',
      'es',
      'umd-min'
    ],
    sourceMap: false
  },
  externals: ['dayjs']
}
