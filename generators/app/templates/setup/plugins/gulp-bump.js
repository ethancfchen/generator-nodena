/**
 * Plugin Setup: gulp-bump
 *
 * @module setup/plugins/gulp-bump
 */

const semver = require('semver');

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
  const env = config.env;
  const inputVer = config.argv.version;
  const currentVer = assets.getPackageJsonVersion();

  let liveVer = inputVer;

  const options = {
    stage: {
      type: 'prerelease',
      preid: 'stage'
    },
    live: {
      version: liveVer
    }
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
      if (semver.valid(inputVer)) {
        liveVer = inputVer;
      } else {
        liveVer = semver.inc(currentVer, 'patch');
      }
  }
  options.live.version = liveVer;

  return options[env];
};
