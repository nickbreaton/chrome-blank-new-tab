const clean = require('gulp-clean')
const gulp = require('gulp')
const zip = require('gulp-zip')

const { name, files } = require('./package.json')
const { version } = require('./manifest.json')

gulp.task('clean:development', () => {
  return gulp.src('dist/*').pipe(clean())
})

gulp.task('build:development', ['clean:development'], () => {
  return gulp.src(files).pipe(gulp.dest('dist'))
})

gulp.task('build:production', () => {
  return gulp.src(files)
    .pipe(zip(`${name}-${version}.zip`))
    .pipe(gulp.dest('.'))
})


