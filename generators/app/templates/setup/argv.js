const NODE_ENV = process.env.NODE_ENV;
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE;

module.exports = require('yargs').version(false).option({
  b: {
    alias: 'verbose',
  },
  p: {
    alias: 'port',
    type: 'number',
    nargs: 1,
  },
  n: {
    alias: 'new-version',
    type: 'string',
    nargs: 1,
    default: 'prerelease',
  },

  preid: {
    type: 'string',
    nargs: 1,
    default:
      (NODE_ENV ? NODE_ENV : '') +
      (NODE_APP_INSTANCE ? '-' + NODE_APP_INSTANCE : ''),
  },
}).argv;
