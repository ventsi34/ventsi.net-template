const { task, src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

task('sass', function () {
   return src('./src/styles/**/*.scss')
   .pipe(concat('main.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(dest('./dist/'));
});

task('move-static', function () {
  return src('static/**/*')
    .pipe(dest('./dist/static/'));
});

task('move-html', function () {
  return src('src/**/*.html')
    .pipe(dest('dist/'));
});

task('clean', function () {
  return src('./dist', { read: false, allowEmpty: true })
    .pipe(rimraf());
});

task('watch', function () {
  watch('./src/**/*.html', series('move-html'));
  watch('./static/**/*', series('move-static'));
  watch('./src/**/*.scss', series('sass'));
});

task('default', series('clean', 'move-static', 'move-html', 'sass'));