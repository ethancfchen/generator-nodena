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

function getNewVersion(newVersion, preid) {
  const current = getVersion();
  let target = newVersion;
  if (semver.valid(newVersion)) {
    target = newVersion;
  } else {
    target = semver.inc(current, newVersion, preid);
  }
  return target;
}

function gitAdd() {
  const targetFile = ASSETS.manifest;
  const args = ['add', targetFile].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args}, (error, stdout) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

function gitCommit() {
  const version = getVersion();
  const args = ['commit', '-m', version].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args}, (error, stdout) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

function gitTag() {
  const version = getVersion();
  const args = ['tag', '-a', version, '-m', version].join(' ');
  return new Promise((resolve, reject) => {
    $.git.exec({args}, (error, stdout) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

module.exports = function() {
  const argv = yargs.option(ARGV_SETUP).argv;
  const newVersion = argv.newVersion;
  const preid = argv.preid;
  const isNew = newVersion !== undefined;
  return gulp.src(ASSETS.manifest)
    .pipe($.if(isNew, $.bump({version: getNewVersion(newVersion, preid)})))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      if (!isNew) {
        return log(`Package version ${chalk.magenta(getVersion())}`);
      }
      gitAdd()
        .then(gitCommit)
        .then(gitTag)
        .catch((error) => console.error(error));
    });
};
