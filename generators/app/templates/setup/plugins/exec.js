/**
 * Plugin Setup: Common executions
 *
 * @module setup/plugins/exec
 */

/**
 * Plugin Setup: Common executions
 *
 * @example {@lang javascript}
 * var exec = require('./plugins/exec')();
 * @return {object} Plugins options.
 */
class PluginExec {
  constructor(config, assets) {
    this.maxBuffer = 1024 * 1024;
  }
}

module.exports = PluginExec;
