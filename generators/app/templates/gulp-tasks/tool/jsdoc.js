const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('config');

module.exports = function() {
  const assets = config.assets;
  const files = assets.jsdoc.files;
  del(assets.jsdoc.dest);
  return gulp.src(files, {read: false})
    .pipe($.jsdoc3());
};
