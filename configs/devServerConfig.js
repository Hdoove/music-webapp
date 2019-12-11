const path = require('path');

module.exports = {
  contentBase: path.join(__dirname, 'public'),
  port: 80,
  host: '0.0.0.0',
  hotOnly: true,
  compress: true,
  historyApiFallback: true,
  quiet: false,
  progress: true,
  open: 'Google Chrome',
  proxy: {
    '/api': {
      target: 'http://localhost:4000',
      changeOrigin: true,
      secure: false
    }
  }
};