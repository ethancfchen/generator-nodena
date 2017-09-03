const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const setup = require('setup/setup');

function gitCommitAndTag() {
  gitAdd()
    .then(gitCommit)
    .then(gitTag);
}

function gitAdd() {
  const targetFile = setup.assets.manifest;
  const command = ['add', targetFile].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args: command}, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function gitCommit() {
  const version = setup.getVersion();
  const command = ['commit', '-m', version].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args: command}, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function gitTag() {
  const version = setup.getVersion();
  const command = ['tag', '-a', version, '-m', version].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args: command}, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = function() {
  const assets = setup.assets;

  const optionsBump = setup.plugins.gulpBump;

  return gulp.src(assets.manifest)
    .pipe($.bump(optionsBump))
    .pipe(gulp.dest('./'))
    .on('end', gitCommitAndTag);
};
