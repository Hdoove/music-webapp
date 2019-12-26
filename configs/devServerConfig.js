const path = require('path');

module.exports = {
  contentBase: path.join(__dirname, 'public'),
  port: 8081,
  host: '0.0.0.0',
  hotOnly: true,
  compress: true,
  historyApiFallback: true,
  quiet: false,
  progress: true,
  open: 'Google Chrome',
  disableHostCheck: true
};