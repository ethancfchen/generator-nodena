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
    const inputVer = options.argv.version;
    const preid = options.argv.preid;
    const currentVer = assets.getPackageJsonVersion();

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
