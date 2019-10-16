const { BABEL_ENV } = process.env;

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 9'],
        },
        modules: BABEL_ENV === 'cjs' ? 'cjs' : false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: ['dynamic-import-webpack', '@babel/plugin-proposal-class-properties'],
};
