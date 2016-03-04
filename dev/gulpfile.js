var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

gulp.task('sass', function() {
  gulp.src(["scss/**/*.scss","!scss/**/_*.scss"])
    .pipe(plumber())
    .pipe(sass({includePaths: ['bower_components/foundation-sites/scss','bower_components/motion-ui/src']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("../common/css"));
});

gulp.task('jade', function () {
  gulp.src(['jade/**/*.jade','!jade/**/_*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('../'));
});

var copy_js = [
  'js/app.js',
  'bower_components/what-input/what-input.min.js',
  'bower_components/modernizr/modernizr.js',
  'bower_components/jquery/dist/jquery.min.js',
  'bower_components/foundation-sites/dist/foundation.min.js'
];

gulp.task('copy', function () {
  gulp.src(copy_js)
   .pipe(gulp.dest('../common/js'));
});

gulp.task('webserver', function() {
  gulp.src('../') // set site root
    .pipe(webserver({
      host: 'localhost',
      port: 7001,
      livereload: true
    }));
});

gulp.task('watch', function(){
  gulp.watch(['scss/**/*.scss','jade/**/*.jade'],['sass','jade']);
});

gulp.task('default', ['webserver','copy','watch']);