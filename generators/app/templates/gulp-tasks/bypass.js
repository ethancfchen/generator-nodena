'use strict';

var runSequence = require('run-sequence');

module.exports = function () {
  this.opts.env = 'bypass';
  runSequence('main:bypass');
};
