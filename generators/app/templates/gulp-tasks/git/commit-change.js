'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var projectSetup = require('setup/setup');

module.exports = function () {
  var env = this.opts.env;

  var setup = projectSetup(env);
  var assets = setup.assets;

  var version = setup.getVersion();

  var optionsExec = setup.plugins.exec;

  return gulp
    .src([assets.dist, assets.manifest, assets.changelog])
    .pipe($.git.add({
      maxBuffer: optionsExec.maxBuffer
    }))
    .pipe($.git.commit('[Online] ' + version, {
      maxBuffer: optionsExec.maxBuffer
    }));
};
