module.exports = require('yargs').option({
  b: {
    alias: 'verbose',
  },
  p: {
    alias: 'port',
    type: 'number',
    nargs: 1,
  },
}).argv;
