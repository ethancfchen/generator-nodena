'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var _ = require('lodash');
var path = require('path');

var projectSetup = require('setup/setup');

module.exports = function (cb) {
  var env = this.opts.env;

  var setup = projectSetup(env);
  var assets = setup.assets;

  var version = setup.getVersion();
  var command = [
    'diff-tree', '-r', '--name-only', '--no-commit-id',
    'HEAD', '--', assets.dist
  ].join(' ');

  var optionsExec = setup.plugins.exec;

  $.git.exec({
    args: command,
    maxBuffer: optionsExec.maxBuffer
  }, function (err, stdout) {
    var files = [];
    if (err) {
      return cb(err);
    }
    files = _(stdout.split('\n'))
      .compact()
      .map(function (item) {
        return item.replace(assets.dist, '**');
      })
      .value();
    gulp
      .src(files, {cwd: assets.dist})
      .pipe(gulp.dest('./', {cwd: path.join(assets.online.patches, version)}));
    cb(err, stdout);
  });
};
