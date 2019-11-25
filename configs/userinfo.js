module.exports = {
  indexConfig: {
    client_id: process.env.NODE_ENV === 'production' ? 'tjsl' : 'putty_test',
    redirect_uri: process.env.NODE_ENV === 'production' ?
      'https://swj.novaspace.site/callback' :
      'http://localhost:3000/callback'
  }
};