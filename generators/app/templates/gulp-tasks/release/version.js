'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var projectSetup = require('setup/setup');

module.exports = function () {
  var env = this.opts.env;

  var setup = projectSetup(env);
  var assets = setup.assets;

  var options = setup.plugins.gulpBump;

  return gulp
    .src(assets.manifest)
    .pipe($.bump(options))
    .pipe(gulp.dest('./'));
};
