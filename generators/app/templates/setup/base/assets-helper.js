const _ = require('lodash');
const fs = require('fs');
const moment = require('moment');

function readFile(path) {
  return fs.readFileSync(path, 'utf8');
}

function readJsonFile(path) {
  return JSON.parse(readFile(path));
}

class BaseAssetsHelper {
  constructor(config) {
    _.merge(this, config);
  }

  isFileExist(path) {
    return fs.existsSync(path);
  }

  getPackageJsonVersion() {
    return readJsonFile(this.manifest).version;
  }

  generateChangelog(log) {
    const template = readFile(this.template.changelog);
    const version = this.getPackageJsonVersion();
    const now = moment().format();
    return template
      .replace('{version}', version)
      .replace('{now}', now)
      .replace('{log}', log);
  }
}

module.exports = BaseAssetsHelper;
