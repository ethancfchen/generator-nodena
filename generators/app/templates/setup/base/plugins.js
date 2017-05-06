const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const PATH_PLUGINS = '../plugins';

module.exports = function (config, assets) {
  const pluginPath = path.resolve(__dirname, PATH_PLUGINS);
  const pluginFiles = fs.readdirSync(pluginPath);
  const options = {};

  pluginFiles.forEach(pluginFile => {
    const name = _.camelCase(pluginFile.replace(/\..+$/, ''));
    const file = path.resolve(pluginPath, pluginFile);
    options[name] = require(file)(config, assets);
  });

  return options;
};
