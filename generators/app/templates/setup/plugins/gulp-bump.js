const semver = require('semver');

const argv = require('../argv');

/**
 * Plugin Setup: gulp-bump
 *
 * @module setup/plugins/gulp-bump
 *
 * @example {@lang javascript}
 * const PluginGulpBump = require('./plugins/gulp-bump');
 * const pluginGulpBump = new PluginExec(assetsHelper);
 *
 * @see {@link https://github.com/stevelacy/gulp-bump/|Github}
 */
class PluginGulpBump {
  constructor(assetsHelper) {
    const inputVer = argv.newVersion;
    const preid = argv.preid;
    const currentVer = assetsHelper.getPackageJsonVersion();

    let targetVer = inputVer;

    if (semver.valid(inputVer)) {
      targetVer = inputVer;
    } else {
      targetVer = semver.inc(currentVer, inputVer, preid);
    }

    this.version = targetVer;
  }
}

module.exports = PluginGulpBump;
