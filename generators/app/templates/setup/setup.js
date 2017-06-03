const fs = require('fs');
const path = require('path');

const argv = require('./argv');

const PATH_BASE = './base/';
const IS_ONLINE = {
  local: false,
  bypass: true,
  stage: true,
  live: true,
};

function getClass(fileName) {
  const file = path.resolve(__dirname, fileName + '.js');

  if (fs.existsSync(file)) {
    return require('./' + fileName);
  }
  return require(PATH_BASE + fileName);
}

class Setup {
  constructor(env) {
    const options = {
      env: env || argv.env || 'local',
      argv,
    };
    const Assets = getClass('assets');
    const Plugins = getClass('plugins');

    const assets = new Assets(options);
    const plugins = new Plugins(options, assets);

    this.env = options.env;

    this.assets = assets;
    this.plugins = plugins;

    this.isLocal = !IS_ONLINE[options.env];
    this.isOnline = IS_ONLINE[options.env];
    this.isVerbose = argv.verbose;
    this.domain = assets.domain;
  }

  getPreference() {
    return this.assets.getPreference();
  }

  getVersion() {
    return 'v' + this.assets.getPackageJsonVersion();
  }

  getChangelog(log) {
    return this.assets.generateChangelog(log);
  }
}

module.exports = Setup;
