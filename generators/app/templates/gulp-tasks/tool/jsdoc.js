const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;
  const files = assets.jsdoc.files;
  del(assets.jsdoc.dest);

  return gulp.src(files, {read: false})
    .pipe($.jsdoc3());
};
