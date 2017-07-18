const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;

  const options = setup.plugins.gulpBump;

  return pump([
    gulp.src(assets.manifest),
    $.bump(options),
    gulp.dest('./'),
  ]);
};
