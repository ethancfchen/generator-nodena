const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const fs = require('fs');
const path = require('path');

const GulpRegistry = require('undertaker-forward-reference');

const PATH_TASK_LOADER = 'gulptasks.js';

require('rootpath')();

if (fs.existsSync(path.resolve(__dirname, PATH_TASK_LOADER))) {
  require(path.resolve(__dirname, PATH_TASK_LOADER))();
} else {
  gulp.registry(new GulpRegistry());
  $.loadAllTasks();
}
