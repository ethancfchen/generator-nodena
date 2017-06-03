const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const PATH_TARGET = '../plugins';

class Plugins {
  constructor(options, assets) {
    const targetPath = path.resolve(__dirname, PATH_TARGET);
    const filepaths = fs.readdirSync(targetPath);

    filepaths.forEach((filepath) => {
      const name = _.camelCase(filepath.replace(/\..+$/, ''));
      const file = path.resolve(targetPath, filepath);
      const Plugin = require(file);

      this[name] = new Plugin(options, assets);
    });
  }
}

module.exports = Plugins;
