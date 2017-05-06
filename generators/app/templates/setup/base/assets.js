'use strict';

var fs = require('fs');
var moment = require('moment');

var MANIFEST = 'package.json';
var PREFERENCE = 'setup.json';
var README = 'README.md';
var CHANGELOG = 'CHANGELOG.md';

var BASE = {
  src: 'src/',
  temp: 'dist/',
  online: 'online/',
  res: 'res/'
};

var ONLINE = {
  stage: BASE.online + 'stage/',
  live: BASE.online + 'live/',
  patches: BASE.online + 'patches/'
};
var DIST = {
  local: BASE.temp,
  bypass: BASE.temp,
  stage: ONLINE.stage,
  live: ONLINE.live
};

var TEMPLATE = {
  changelog: BASE.res + 'changelog.template.md'
};

function isFileExist(path) {
  return fs.existsSync(path);
}

function getPackageJsonVersion() {
  return readJsonFile(MANIFEST).version;
}

function getPreference() {
  return readJsonFile(PREFERENCE);
}

function getDomain(config) {
  var LOCALHOST = 'http://localhost';
  var pref = getPreference();
  var prefEnv = pref[config.env] || {};
  var localUrl = LOCALHOST + ':' + (config.argv.port || pref.server.port);

  return prefEnv.domain || {
    local: localUrl,
    bypass: localUrl
  }[config.env];
}

function readFile(path) {
  return fs.readFileSync(path, 'utf8');
}

function readJsonFile(path) {
  return JSON.parse(readFile(path));
}

function generateChangelog(log) {
  var template = readFile(TEMPLATE.changelog);
  var version = getPackageJsonVersion();
  var now = moment().format();
  return template.replace('{version}', version)
    .replace('{now}', now)
    .replace('{log}', log);
}

module.exports = function (config) {
  return {
    manifest: MANIFEST,
    readme: README,
    changelog: CHANGELOG,

    base: BASE,

    dist: DIST[config.env],
    online: ONLINE,
    domain: getDomain(config),

    isFileExist: isFileExist,
    getPreference: getPreference,
    getPackageJsonVersion: getPackageJsonVersion,
    generateChangelog: generateChangelog
  };
};
