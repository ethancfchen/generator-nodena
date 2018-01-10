const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks',
  'gulp-tasks/tool/jsdoc.js',
  'gulp-tasks/version.js',
  'setup',
  'setup/base',
  'setup/base/assets-helper.js',
  'setup/base/plugins.js',
  'setup/argv.js',
  'setup/setup.js',
  'src',
  'gulpfile.js',
  'package.json',
];

describe('generator-nodena:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'));
  });

  it('creates files', () => {
    assert.file(appAssets);
  });
});
