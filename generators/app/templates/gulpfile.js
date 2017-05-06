'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var fs = require('fs');
var path = require('path');

var PATH_TASK_LOADER = 'gulptasks.js';

require('rootpath')();

if (fs.existsSync(path.resolve(__dirname, PATH_TASK_LOADER))) {
  require(path.resolve(__dirname, PATH_TASK_LOADER))();
} else {
  $.taskLoader();
}

gulp.task('default', ['local']);
