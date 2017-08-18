const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const options = setup.plugins.gulpBump;

  return gulp.src(assets.manifest)
    .pipe($.bump(options))
    .pipe(gulp.dest('./'));
};
