const $ = require('gulp-load-plugins')();

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);

  const version = setup.getVersion();

  const optionsExec = setup.plugins.exec;

  $.git.tag(version, '[Online] Tag: ' + version, {
    maxBuffer: optionsExec.maxBuffer,
  });
};
