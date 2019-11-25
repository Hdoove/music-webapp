const indexConfig = {
  hash: true,
  title: '网一云音乐',
  template: './templates/index.ejs',
  chunksSortMode: 'none',
};

if (process.env.NODE_ENV === 'production') {
  indexConfig.meta = {
    'Content-Security-Policy': {
      'http-equiv': 'Content-Security-Policy',
      content: 'upgrade-insecure-requests'
    }
  };
}

module.exports = {
  indexConfig
};