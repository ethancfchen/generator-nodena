const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks',
  'gulp-tasks/tool/jsdoc.js',
  'gulp-tasks/version.js',
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
