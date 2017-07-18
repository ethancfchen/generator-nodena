const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;

  const options = setup.plugins.gulpBump;

  return gulp.src(assets.manifest)
    .pipe($.bump(options))
    .pipe(gulp.dest('./'));
};
