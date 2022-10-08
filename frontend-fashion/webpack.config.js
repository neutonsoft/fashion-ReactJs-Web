module.exports = {
    devServer: {
      contentBase: './',
      compress: true,
      proxy: {
        '/graphql': {
          target: 'http://localhost:3000/server.js',
          secure: false,
        },
      },
    },
  };