const runSequence = require('run-sequence');

module.exports = function() {
  this.opts.env = 'local';

  runSequence('main:local');
};
