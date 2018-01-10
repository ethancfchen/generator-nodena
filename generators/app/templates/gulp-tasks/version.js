const fs = require('fs');
const semver = require('semver');
const chalk = require('chalk');
const gulp = require('gulp');
const gutil = require('gulp-util'); // @Deprecated
const $ = require('gulp-load-plugins')();

const NODE_ENV = process.env.NODE_ENV;
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE;
const ASSETS = {
  manifest: 'package.json',
};

const argv = require('yargs').option({
  n: {
    alias: 'new',
    type: 'string',
    nargs: 1,
  },
  preid: {
    type: 'string',
    nargs: 1,
    default:
      (NODE_ENV ? NODE_ENV : '') +
      (NODE_APP_INSTANCE ? '-' + NODE_APP_INSTANCE : ''),
  },
}).argv;

function getVersion() {
  const fileContent = fs.readFileSync(ASSETS.manifest, 'utf8');
  const manifest = JSON.parse(fileContent);
  return 'v' + manifest.version;
}

function getNewVersion() {
  const input = argv.new;
  const postfix = argv.preid;
  const current = getVersion();
  let target = input;

  if (semver.valid(input)) {
    target = input;
  } else {
    target = semver.inc(current, input, postfix);
  }
  return target;
}

function gitAdd() {
  const targetFile = ASSETS.manifest;
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
  const version = getVersion();
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
  const version = getVersion();
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
  const version = getVersion();
  const isNew = argv.new;

  return gulp.src(ASSETS.manifest)
    .pipe(isNew ? $.bump({
      version: getNewVersion(),
    }) : gutil.noop())
    .pipe(gulp.dest('./'))
    .on('end', () => {
      if (isNew) {
        gitAdd()
          .then(gitCommit)
          .then(gitTag);
      } else {
        gutil.log(`Package version ${chalk.magenta(version)}`);
      }
    });
};
