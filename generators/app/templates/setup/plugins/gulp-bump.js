'use strict';

/**
 * Plugin Setup: gulp-bump
 *
 * @module setup/plugins/gulp-bump
 */

var semver = require('semver');

/**
 * Plugin Setup: gulp-bump
 *
 * @example {@lang javascript}
 * var gulpBump = require('./plugins/gulp-bump')(config, assets);
 *
 * @see {@link https://github.com/stevelacy/gulp-bump/|Github}
 * @param  {object} config Project configurations.
 * @param  {object} assets Project assets.
 * @return {object}        Plugins options.
 */
module.exports = function (config, assets) {
  var env = config.env;
  var inputVer = config.argv.version;
  var currentVer = assets.getPackageJsonVersion();

  var liveVer = inputVer;
  var options = {
    stage: {type: 'prerelease', preid: 'stage'},
    live: {version: liveVer}
  };

  switch (inputVer) {
    case 'patch':
      liveVer = semver.inc(currentVer, 'patch');
      break;
    case 'minor':
      liveVer = semver.inc(currentVer, 'minor');
      break;
    case 'major':
      liveVer = semver.inc(currentVer, 'major');
      break;
    default:
      liveVer = semver.valid(inputVer) ? inputVer : semver.inc(currentVer, 'patch');
  }
  options.live.version = liveVer;

  return options[env];
};
