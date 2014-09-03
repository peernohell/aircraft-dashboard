var
del = require('del'),
gulp = require('gulp'),
karma = require('karma').server,
concat = require('gulp-concat'),
uglify = require('gulp-uglifyjs'),
webserver = require('./server'),
bower = require('gulp-bower'),
ngAnnotate = require('gulp-ng-annotate'),
wiredep = require('wiredep').stream,
runSequence = require('run-sequence');

/**
 * Run test once and exit
 */
gulp.task('test', ['build'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', ['build'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});


var paths = {
  scripts: './js/*',
  images: './assets/*',
  css: './*.css',
  html: './index.html'
};

gulp.task('clean', function(cb) {
  del(['./build'], cb);
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(wiredep())
    .pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(ngAnnotate())
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('vendor', function() {
  return bower()
    .pipe(gulp.dest('./build/bower_components'));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest('./build/'));
});

gulp.task('webserver', function(cb) {
  webserver(cb);
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('build', function (cb) {
  runSequence('clean', 'scripts', 'vendor', 'images', 'html', 'css', cb);
});

gulp.task('default', function (cb) {
  runSequence('build', ['webserver', 'watch'], cb);
});
