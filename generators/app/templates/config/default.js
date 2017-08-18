const path = require('path');
const defer = require('config/defer').deferConfig;

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  env: NODE_ENV,

  assets: {
    base: {
      src: 'src',
      build: 'build',
      online: 'online',
      res: 'res',
    },
    build: defer((config) => {
      return config.assets.base.build;
    }),

    manifest: 'package.json',
    readme: 'README.md',
    changelog: 'CHANGELOG.md',
    template: {
      changelog: path.join('res', 'changelog.template.md'),
    },
  },
};
