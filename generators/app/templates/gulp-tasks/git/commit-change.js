const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;

  const version = setup.getVersion();

  const optionsExec = setup.plugins.exec;

  return gulp
    .src([assets.dist, assets.manifest, assets.changelog])
    .pipe($.git.add({
      maxBuffer: optionsExec.maxBuffer,
    }))
    .pipe($.git.commit('[Online] ' + version, {
      maxBuffer: optionsExec.maxBuffer,
    }));
};
