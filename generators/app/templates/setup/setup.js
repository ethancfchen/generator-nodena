'use strict';

var fs = require('fs');
var path = require('path');

var argv = require('./argv');

var IS_ONLINE = {
  local: false,
  bypass: true,
  stage: true,
  live: true
};

function getComponent(fileName) {
  var file = path.resolve(__dirname, fileName + '.js');

  if (fs.existsSync(file)) {
    return require('./' + fileName);
  }
  return require('./base/' + fileName);
}

function getVersion(assets) {
  return function () {
    return 'v' + assets.getPackageJsonVersion();
  };
}

module.exports = function (env) {
  var config = {
    env: env || argv.env || 'local',
    argv: argv
  };
  var assets = getComponent('assets')(config);
  var plugins = getComponent('plugins')(config, assets);

  return {
    env: config.env,

    assets: assets,
    plugins: plugins,

    isLocal: !IS_ONLINE[config.env],
    isOnline: IS_ONLINE[config.env],
    isVerbose: argv.verbose,
    domain: assets.domain,

    getPreference: assets.getPreference,
    getVersion: getVersion(assets),
    getChangelog: assets.generateChangelog
  };
};
