const fs = require('fs');
const path = require('path');

const argv = require('./argv');

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
  return require('./base/' + fileName);
}

class Setup {
  constructor(env) {
    const config = {
      env: env || argv.env || 'local',
      argv,
    };
    const Assets = getClass('assets');
    const Plugins = getClass('plugins');

    const assets = new Assets(config);
    const plugins = new Plugins(config, assets);

    this.env = config.env;

    this.config = config;

    this.assets = assets;
    this.plugins = plugins;

    this.isLocal = !IS_ONLINE[config.env];
    this.isOnline = IS_ONLINE[config.env];
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
