module.exports = {
  plugins: {
    autoprefixer: { grid: true },
    'postcss-import': {},
    'postcss-custom-properties': {},
    'postcss-color-function': {},
    'postcss-preset-env': {
      stage: 1,
    },
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
