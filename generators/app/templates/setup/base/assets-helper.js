const _ = require('lodash');
const fs = require('fs');

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
}

module.exports = BaseAssetsHelper;
