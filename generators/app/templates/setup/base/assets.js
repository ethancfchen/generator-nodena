const fs = require('fs');
const moment = require('moment');

const MANIFEST = 'package.json';
const README = 'README.md';
const CHANGELOG = 'CHANGELOG.md';
const TEMPLATE = {
  changelog: 'res/changelog.template.md',
};
const BASE = {
  src: 'src/',
  temp: 'dist/',
  online: 'online/',
  res: 'res/',
};
const ONLINE = {
  stage: BASE.online + 'stage/',
  live: BASE.online + 'live/',
  patches: BASE.online + 'patches/',
};
const DIST = {
  local: BASE.temp,
  bypass: BASE.temp,
  stage: ONLINE.stage,
  live: ONLINE.live,
};
const LOCALHOST = 'http://localhost';

function readFile(path) {
  return fs.readFileSync(path, 'utf8');
}

function readJsonFile(path) {
  return JSON.parse(readFile(path));
}

class BaseAssets {
  constructor(options) {
    this._options = options;
    this._preference = 'setup.json';
    this._template = TEMPLATE;

    this.manifest = MANIFEST;
    this.readme = README;
    this.changelog = CHANGELOG;

    this.base = BASE;

    this.online = ONLINE;
    this.dist = DIST[this._options.env];

    this.domain = this.getDomain();
  }

  isFileExist(path) {
    return fs.existsSync(path);
  }

  getDomain() {
    const config = this._options;
    const pref = this.getPreference();
    const prefEnv = pref[config.env] || {};
    const localUrl = LOCALHOST + ':' + (config.argv.port || pref.server.port);

    return prefEnv.domain || {
      local: localUrl,
      bypass: localUrl,
    }[config.env];
  }

  getPreference() {
    return readJsonFile(this._preference);
  }

  getPackageJsonVersion() {
    return readJsonFile(this.manifest).version;
  }

  generateChangelog(log) {
    const template = readFile(this._template.changelog);
    const version = this.getPackageJsonVersion();
    const now = moment().format();
    return template
      .replace('{version}', version)
      .replace('{now}', now)
      .replace('{log}', log);
  }
}

module.exports = BaseAssets;
