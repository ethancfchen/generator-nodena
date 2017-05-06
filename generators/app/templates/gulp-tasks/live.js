'use strict';

var runSequence = require('run-sequence');

module.exports = function () {
  this.opts.env = 'live';
  runSequence('main:live');
};
