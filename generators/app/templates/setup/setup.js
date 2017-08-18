const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const config = require('config');
const argv = require('./argv');

const AssetsHelper = getClass('assets-helper');
const Plugins = getClass('plugins');

const assetsHelper = new AssetsHelper(config.assets);
const plugins = new Plugins(assetsHelper);

function getClass(fileName) {
  const PATH_BASE = './base/';
  const file = path.resolve(__dirname, fileName + '.js');

  if (fs.existsSync(file)) {
    return require('./' + fileName);
  }
  return require(PATH_BASE + fileName);
}

module.exports = _.merge(config, {
  argv,
  assets: assetsHelper,
  plugins,

  getVersion() {
    return 'v' + assetsHelper.getPackageJsonVersion();
  },

  getChangelog(log) {
    return assetsHelper.generateChangelog(log);
  },
});
