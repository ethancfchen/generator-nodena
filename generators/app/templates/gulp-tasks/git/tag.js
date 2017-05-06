'use strict';

var $ = require('gulp-load-plugins')();

var projectSetup = require('setup/setup');

module.exports = function () {
  var env = this.opts.env;

  var setup = projectSetup(env);

  var version = setup.getVersion();

  var optionsExec = setup.plugins.exec;

  $.git.tag(version, '[Online] Tag: ' + version, {
    maxBuffer: optionsExec.maxBuffer
  });
};
