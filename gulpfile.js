var gulp = require('gulp');

var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

var source = [
  'gulpfile.js',
  'slackSay',
  'lib/**/*.js'
];

gulp.task('jscs', function () {
  return gulp.src(source)
    .pipe(jscs());
});

gulp.task('jshint', function () {
  return gulp.src(source)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('standards', ['jshint', 'jscs']);
