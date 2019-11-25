presets = [
  ['@babel/env'],
  ['@babel/preset-react'],
  ['@babel/preset-typescript']
];

importSupport = [
  'import',
  {
    libraryName: 'antd',
    style: true
  }
];


plugins = [
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
  '@babel/plugin-transform-object-set-prototype-of-to-assign',
  '@babel/plugin-proposal-optional-chaining',
  importSupport
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(['transform-remove-console', {
    exclude: ['error', 'warn']
  }]);
};

module.exports = {
  presets,
  plugins
};