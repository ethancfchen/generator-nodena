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
module.exports = function() {
  const options = {
    maxBuffer: 1024 * 1024,
  };
  return options;
};
