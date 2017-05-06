'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');

var projectSetup = require('setup/setup');

module.exports = function (cb) {
  var setup = projectSetup({env: 'live'});
  var assets = setup.assets;
  var files = [
    assets.changelog,
    assets.readme,
    './*.js',
    './setup/**/*.js',
    './src/js/**/*.js'
  ];
  del('./docs');
  gulp
    .src(files, {read: false})
    .pipe($.jsdoc3(cb));
};
