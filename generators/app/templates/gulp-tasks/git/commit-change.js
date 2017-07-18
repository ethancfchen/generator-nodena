const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;

  const version = setup.getVersion();

  const optionsExec = setup.plugins.exec;

  pump([
    gulp.src([assets.dist, assets.manifest, assets.changelog]),
    $.git.add({
      maxBuffer: optionsExec.maxBuffer,
    }),
    $.git.commit('[Online] ' + version, {
      maxBuffer: optionsExec.maxBuffer,
    }),
  ]);
};
