const fs = require('fs')
const gulp = require('gulp')
const ignore = require('gulp-ignore')
const zip = require('gulp-zip')

const { name } = require('./package.json')
const { version } = require('./manifest.json')

const condition = fs
  .readFileSync('.crxignore')
  .toString('utf-8')
  .split('\n')
  .filter(Boolean)
  .filter(line => line[0] !== '#')

gulp.task('default', () => {
  return gulp.src('**/*')
    .pipe(ignore.exclude(condition))
    .pipe(zip(`${name}-${version}.zip`))
    .pipe(gulp.dest('dist'))
})