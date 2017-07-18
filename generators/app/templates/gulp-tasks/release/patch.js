const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const _ = require('lodash');
const path = require('path');

const Setup = require('setup/setup');

module.exports = function(taskCallback) {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;

  const version = setup.getVersion();
  const command = [
    'diff-tree', '-r', '--name-only', '--no-commit-id',
    'HEAD', '--', assets.dist,
  ].join(' ');

  const optionsExec = setup.plugins.exec;

  $.git.exec({
    args: command,
    maxBuffer: optionsExec.maxBuffer,
  }, (err, stdout) => {
    let files = [];
    if (err) {
      return taskCallback(err);
    }
    files = _(stdout.split('\n'))
      .compact()
      .map((item) => {
        return item.replace(assets.dist, '**');
      })
      .value();
    gulp.src(files, {cwd: assets.dist})
      .pipe(gulp.dest('./', {cwd: path.join(assets.online.patches, version)}));
    taskCallback(err, stdout);
  });
};
