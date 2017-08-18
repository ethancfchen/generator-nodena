const $ = require('gulp-load-plugins')();

const prependFile = require('prepend-file');

const setup = require('setup/setup');

module.exports = function(taskCallback) {
  const assets = setup.assets;

  const commandAdd = ['add', assets.build].join(' ');
  const argsStatus = ['--porcelain', '--', assets.build].join(' ');

  const optionsExec = setup.plugins.exec;

  $.git.exec({
    args: commandAdd,
    maxBuffer: optionsExec.maxBuffer,
  }, (err) => {
    if (err) {
      return taskCallback(err);
    }
    $.git.status({
      args: argsStatus,
      maxBuffer: optionsExec.maxBuffer,
    }, (err2, stdout) => {
      const message = setup.getChangelog(stdout);
      if (err2) {
        return $.git.reset('HEAD', taskCallback);
      }
      prependFile(assets.changelog, message);
      $.git.reset('HEAD', {
        maxBuffer: optionsExec.maxBuffer,
      }, taskCallback);
    });
  });
};
