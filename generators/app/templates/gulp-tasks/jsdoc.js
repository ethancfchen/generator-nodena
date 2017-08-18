const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');

const setup = require('setup/setup');

module.exports = function(taskCallback) {
  const assets = setup.assets;
  const files = [
    assets.changelog,
    assets.readme,
    './*.js',
    './setup/**/*.js',
    './src/js/**/*.js',
  ];
  del('./docs');

  return gulp.src(files, {read: false})
    .pipe($.jsdoc3(taskCallback));
};
