const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'rgb(252, 213, 53)',
              '@success-color-active': 'red',
              '@text-color-dark': 'rgb(231, 190, 27)',
              '@tabs-highlight-color': '#C99400,',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
