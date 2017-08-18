const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks',
  'gulp-tasks/build',
  'gulp-tasks/release',
  'gulp-tasks/release/changelog.js',
  'gulp-tasks/release/patch.js',
  'gulp-tasks/release/version.js',
  'gulp-tasks/build.js',
  'gulp-tasks/jsdoc.js',
  'setup',
  'setup/base',
  'setup/base/assets-helper.js',
  'setup/base/plugins.js',
  'setup/plugins',
  'setup/plugins/exec.js',
  'setup/plugins/gulp-bump.js',
  'setup/argv.js',
  'setup/setup.js',
  'res',
  'res/changelog.template.md',
  'src',
  'CHANGELOG.md',
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
