const fs = require('fs');
const moment = require('moment');

function readFile(path) {
  return fs.readFileSync(path, 'utf8');
}

function readJsonFile(path) {
  return JSON.parse(readFile(path));
}

class Assets {
  constructor(config) {
    this._config = config;
    this._preference = 'setup.json';
    this._template = {
      changelog: this.base.res + 'changelog.template.md',
    };

    this.manifest = 'package.json';
    this.readme = 'README.md';
    this.changelog = 'CHANGELOG.md';

    this.base = {
      src: 'src/',
      temp: 'dist/',
      online: 'online/',
      res: 'res/',
    };

    this.online = {
      stage: this.base.online + 'stage/',
      live: this.base.online + 'live/',
      patches: this.base.online + 'patches/',
    };
    this.dist = {
      local: this.base.temp,
      bypass: this.base.temp,
      stage: this.online.stage,
      live: this.online.live,
    }[this._config.env];

    this.domain = this.getDomain();
  }

  isFileExist(path) {
    return fs.existsSync(path);
  }

  getDomain() {
    const LOCALHOST = 'http://localhost';
    const config = this._config;
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

module.exports = Assets;
