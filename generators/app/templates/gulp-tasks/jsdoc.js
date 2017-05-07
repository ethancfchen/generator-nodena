const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const del = require('del');

const projectSetup = require('setup/setup');

module.exports = function(cb) {
  const setup = projectSetup({env: 'live'});
  const assets = setup.assets;
  const files = [
    assets.changelog,
    assets.readme,
    './*.js',
    './setup/**/*.js',
    './src/js/**/*.js',
  ];
  del('./docs');
  gulp
    .src(files, {read: false})
    .pipe($.jsdoc3(cb));
};
