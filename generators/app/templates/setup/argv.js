module.exports = require('yargs').option({
  b: {
    alias: 'verbose',
  },
  p: {
    alias: 'port',
    type: 'number',
    nargs: 1,
  },
  v: {
    alias: 'version',
    type: 'string',
    nargs: 1,
  },

  preid: {
    type: 'string',
    nargs: 1,
  },
}).argv;
