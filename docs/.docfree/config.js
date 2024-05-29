const repositoryPath = 'https://github.com/nuomijs/nuomi';

module.exports = {
  title: 'NuomiJS',
  mode: 'doc',
  langTheme: 'tomorrow',
  type: 'browser',
  nav: [{
    text: '指南',
    to: '/guide',
  }, {
    text: 'API',
    to: '/api',
  }, {
    text: `v${require('../../lerna.json').version}`,
    menus: [{
      text: '0.x',
      to: 'https://nuomijs.github.io/0.x',
    }],
  }, {
    text: 'GitHub',
    to: repositoryPath,
  }],
  sidebar: {
    pageDepth: 6,
    data: {
      '/guide': {
        title: '指南',
        menus: ['README', 'quick-start', 'functions', 'examples'],
      },
    }
  },
  footer: require.resolve('./footer.js'),
  pageExtra: {
    path: `${repositoryPath}/tree/master/docs`,
  },
  webpack: {
    resolve: {
      alias: {
        '@nuomi': require.resolve('../../packages/nuomi/lib'),
      },
    },
  },
};
