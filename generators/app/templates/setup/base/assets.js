const fs = require('fs');
const moment = require('moment');

const MANIFEST = 'package.json';
const PREFERENCE = 'setup.json';
const README = 'README.md';
const CHANGELOG = 'CHANGELOG.md';

const BASE = {
  src: 'src/',
  temp: 'dist/',
  online: 'online/',
  res: 'res/'
};

const ONLINE = {
  stage: BASE.online + 'stage/',
  live: BASE.online + 'live/',
  patches: BASE.online + 'patches/'
};
const DIST = {
  local: BASE.temp,
  bypass: BASE.temp,
  stage: ONLINE.stage,
  live: ONLINE.live
};

const TEMPLATE = {
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
  const LOCALHOST = 'http://localhost';
  const pref = getPreference();
  const prefEnv = pref[config.env] || {};
  const localUrl = LOCALHOST + ':' + (config.argv.port || pref.server.port);

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
  const template = readFile(TEMPLATE.changelog);
  const version = getPackageJsonVersion();
  const now = moment().format();
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

    isFileExist,
    getPreference,
    getPackageJsonVersion,
    generateChangelog
  };
};
