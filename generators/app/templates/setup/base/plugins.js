const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const PATH_PLUGINS = '../plugins';

class Plugins {
  constructor(config, assets) {
    const pluginPath = path.resolve(__dirname, PATH_PLUGINS);
    const pluginFiles = fs.readdirSync(pluginPath);

    pluginFiles.forEach((pluginFile) => {
      const name = _.camelCase(pluginFile.replace(/\..+$/, ''));
      const file = path.resolve(pluginPath, pluginFile);
      const Plugin = require(file);

      this[name] = new Plugin(config, assets);
    });
  }
}

module.exports = Plugins;
