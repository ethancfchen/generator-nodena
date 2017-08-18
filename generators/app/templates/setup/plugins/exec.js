/**
 * Plugin Setup: Common executions
 *
 * @module setup/plugins/exec
 *
 * @example {@lang javascript}
 * const PluginExec = require('./plugins/exec');
 * const pluginExec = new PluginExec();
 */
class PluginExec {
  constructor() {
    this.maxBuffer = 1024 * 1024;
  }
}

module.exports = PluginExec;
