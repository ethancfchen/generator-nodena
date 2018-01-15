const fs = require('fs');
const semver = require('semver');
const log = require('fancy-log');
const chalk = require('chalk');
const yargs = require('yargs');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const NODE_ENV = process.env.NODE_ENV;
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE;
const ARGV_SETUP = {
  n: {
    alias: 'new-version',
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
};
const ASSETS = {
  manifest: 'package.json',
};

function getVersion() {
  const fileContent = fs.readFileSync(ASSETS.manifest, 'utf8');
  const manifest = JSON.parse(fileContent);
  return 'v' + manifest.version;
}

function getNewVersion(argv) {
  const input = argv.newVersion;
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
  const args = ['add', targetFile].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args}, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function gitCommit() {
  const version = getVersion();
  const args = ['commit', '-m', version].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args}, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function gitTag() {
  const version = getVersion();
  const args = ['tag', '-a', version, '-m', version].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args}, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = function() {
  const argv = yargs.option(ARGV_SETUP).argv;
  return gulp.src(ASSETS.manifest)
    .pipe($.if(argv.newVersion !== undefined,
      $.bump({version: getNewVersion(argv)})))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      gitAdd()
        .then(gitCommit)
        .then(gitTag)
        .catch((error) => console.error(error));
      log(`Package version ${chalk.magenta(getVersion())}`);
    });
};
