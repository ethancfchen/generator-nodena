const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks',
  'gulp-tasks/main',
  'gulp-tasks/build',
  'gulp-tasks/git',
  'gulp-tasks/git/commit-change.js',
  'gulp-tasks/git/tag.js',
  'gulp-tasks/release',
  'gulp-tasks/release/changelog.js',
  'gulp-tasks/release/patch.js',
  'gulp-tasks/release/version.js',
  'gulp-tasks/local.js',
  'gulp-tasks/bypass.js',
  'gulp-tasks/stage.js',
  'gulp-tasks/live.js',
  'gulp-tasks/jsdoc.js',
  'setup',
  'setup/base',
  'setup/base/assets.js',
  'setup/base/plugins.js',
  'setup/plugins',
  'setup/plugins/exec.js',
  'setup/plugins/gulp-bump.js',
  'setup/argv.js',
  'setup/setup.js',
  'res',
  'res/changelog.template.md',
  'src',
  'online',
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
