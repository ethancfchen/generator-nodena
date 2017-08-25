const gulp = require('gulp');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')();

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const optionsBump = setup.plugins.gulpBump;

  return gulp.src(assets.manifest)
    .pipe($.bump(optionsBump))
    .pipe(gulp.dest('./'))
    .on('end', (event) => {
      gutil.log(setup.getVersion());
      gulp.src(assets.manifest)
        .pipe($.git.commit(setup.getVersion()))
        .pipe($.git.tag(setup.getVersion()));
    });
};
