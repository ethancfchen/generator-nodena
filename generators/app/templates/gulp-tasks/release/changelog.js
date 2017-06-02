const $ = require('gulp-load-plugins')();

const prependFile = require('prepend-file');

const Setup = require('setup/setup');

module.exports = function(cb) {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;

  const commandAdd = ['add', assets.dist].join(' ');
  const argsStatus = ['--porcelain', '--', assets.dist].join(' ');

  const optionsExec = setup.plugins.exec;

  $.git.exec({
    args: commandAdd,
    maxBuffer: optionsExec.maxBuffer,
  }, (err) => {
    if (err) {
      return cb(err);
    }
    $.git.status({
      args: argsStatus,
      maxBuffer: optionsExec.maxBuffer,
    }, (err2, stdout) => {
      const message = setup.getChangelog(stdout);
      if (err2) {
        return $.git.reset('HEAD', cb);
      }
      prependFile(assets.changelog, message);
      $.git.reset('HEAD', {
        maxBuffer: optionsExec.maxBuffer,
      }, cb);
    });
  });
};
