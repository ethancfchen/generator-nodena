const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const GulpRegistry = require('undertaker-forward-reference');

const browserSync = require('browser-sync').create();

require('rootpath')();

gulp.registry(new GulpRegistry());
$.loadAllTasks({
  browserSync,
});

gulp.task('default', gulp.series('build'));
