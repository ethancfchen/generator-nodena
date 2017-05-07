const runSequence = require('run-sequence');

module.exports = function() {
  this.opts.env = 'stage';
  runSequence('main:stage');
};
