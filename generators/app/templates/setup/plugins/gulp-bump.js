const _ = require('lodash');
const semver = require('semver');

/**
 * Plugin Setup: gulp-bump
 *
 * @module setup/plugins/gulp-bump
 *
 * @example {@lang javascript}
 * const PluginGulpBump = require('./plugins/gulp-bump');
 * const pluginGulpBump = new PluginExec(options, assets);
 *
 * @see {@link https://github.com/stevelacy/gulp-bump/|Github}
 */
class PluginGulpBump {
  constructor(options, assets) {
    const env = options.env;
    const inputVer = options.argv.version;
    const currentVer = assets.getPackageJsonVersion();

    let liveVer = inputVer;
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

    const result = {
      stage: {
        type: 'prerelease',
        preid: 'stage',
      },
      live: {
        version: liveVer,
      },
    };
    _.merge(this, result[env]);
  }
}

module.exports = PluginGulpBump;
