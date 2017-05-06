'use strict';

var $ = require('gulp-load-plugins')();

var prependFile = require('prepend-file');

var projectSetup = require('setup/setup');

module.exports = function (cb) {
  var env = this.opts.env;

  var setup = projectSetup(env);
  var assets = setup.assets;

  var commandAdd = ['add', assets.dist].join(' ');
  var argsStatus = ['--porcelain', '--', assets.dist].join(' ');

  var optionsExec = setup.plugins.exec;

  $.git.exec({
    args: commandAdd,
    maxBuffer: optionsExec.maxBuffer
  }, function (err) {
    if (err) {
      return cb(err);
    }
    $.git.status({
      args: argsStatus,
      maxBuffer: optionsExec.maxBuffer
    }, function (err2, stdout) {
      var message = setup.getChangelog(stdout);
      if (err2) {
        return $.git.reset('HEAD', cb);
      }
      prependFile(assets.changelog, message);
      $.git.reset('HEAD', {
        maxBuffer: optionsExec.maxBuffer
      }, cb);
    });
  });
};
