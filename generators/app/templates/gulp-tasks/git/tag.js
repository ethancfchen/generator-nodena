const $ = require('gulp-load-plugins')();

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = new Setup(env);

  const version = setup.getVersion();

  const optionsExec = setup.plugins.exec;

  $.git.tag(version, '[Online] Tag: ' + version, {
    maxBuffer: optionsExec.maxBuffer,
  });
};
