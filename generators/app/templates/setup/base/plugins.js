'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var PATH_PLUGINS = '../plugins';

module.exports = function (config, assets) {
  var pluginPath = path.resolve(__dirname, PATH_PLUGINS);
  var pluginFiles = fs.readdirSync(pluginPath);
  var options = {};

  pluginFiles.forEach(function (pluginFile) {
    var name = _.camelCase(pluginFile.replace(/\..+$/, ''));
    var file = path.resolve(pluginPath, pluginFile);
    options[name] = require(file)(config, assets);
  });

  return options;
};
