module.exports = {
  plugins: {
    autoprefixer: { grid: true },
    'postcss-import': {},
    'postcss-preset-env': {},
    'postcss-color-function': {},
    'postcss-custom-properties': {},
    'postcss-inherit': {},
    'postcss-assets': {},
    'postcss-nested': {},
    cssnano: {
      reduceIdents: false,
      zindex: false,
    },
    'postcss-hexrgba': {},
  },
  sourceMap: true || 'inline',
};
