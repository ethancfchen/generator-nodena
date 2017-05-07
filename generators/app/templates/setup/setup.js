const fs = require('fs');
const path = require('path');

const argv = require('./argv');

const IS_ONLINE = {
  local: false,
  bypass: true,
  stage: true,
  live: true,
};

function getComponent(fileName) {
  const file = path.resolve(__dirname, fileName + '.js');

  if (fs.existsSync(file)) {
    return require('./' + fileName);
  }
  return require('./base/' + fileName);
}

function getVersion(assets) {
  return function() {
    return 'v' + assets.getPackageJsonVersion();
  };
}

module.exports = function(env) {
  const config = {
    env: env || argv.env || 'local',
    argv,
  };
  const assets = getComponent('assets')(config);
  const plugins = getComponent('plugins')(config, assets);

  return {
    env: config.env,

    assets,
    plugins,

    isLocal: !IS_ONLINE[config.env],
    isOnline: IS_ONLINE[config.env],
    isVerbose: argv.verbose,
    domain: assets.domain,

    getPreference: assets.getPreference,
    getVersion: getVersion(assets),
    getChangelog: assets.generateChangelog,
  };
};
