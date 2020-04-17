module.exports = {
  title: 'NuomiJS',
  mode: 'doc',
  langTheme: 'tomorrow',
  nav: [{
    text: '指南',
    to: '/guide',
  }, {
    text: 'API',
    to: '/api',
  }, {
    text: `v${require('../../lerna.json').version}`,
    to: 'https://github.com/nuomijs/nuomi/blob/master/CHANGELOG.md',
  }, {
    text: 'GitHub',
    to: 'https://github.com/nuomijs/nuomi',
  }],
  sidebar: {
    pageDepth: 6,
    data: {
      '/guide': {
        title: '指南',
        menus: ['README', 'quick-start', 'examples'],
      },
      '/api': {
        title: 'API',
        menus: ['README'],
      },
    }
  },
  footer: require.resolve('./footer.js'),
};
