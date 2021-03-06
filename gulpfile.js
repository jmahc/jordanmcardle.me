'use strict';
var gulp            = require('gulp')
  , http            = require('http')
  , nodemon         = require('gulp-nodemon')
  , autoprefixer    = require('autoprefixer')
  , minifyCSS       = require('gulp-minify-css')
  , less            = require('gulp-less')
  , prefix          = require('gulp-autoprefixer')
  , plumber         = require('gulp-plumber')
  , uglify          = require('gulp-uglify')
  , concat          = require('gulp-concat')
  , rename          = require('gulp-rename')
  , browserSync     = require('browser-sync')
  , input           = {
                      'mainLess'    : './source/css/main.less',
                      'otherLess'   : './source/css/**/*.less',
                      'html'        : './views/**/*.jade',
                      'jQuery'      : './source/js/libs/jquery-1.11.3.min.js',
                      'scrollMagic' : './source/js/libs/scrollmagic/**/*.min.js',
                      'jsLibs'      : './source/js/libs/**/*.min.js',
                      'jsSite'      : './source/js/script.js'
    }
  , output          = {
                      'css' : './public/assets/css/',
                      'js'  : './public/assets/js'
    };

// gulp.task('default', ['watch', 'less', 'plugins-js', 'site-js', 'html', 'start']);

gulp.task('default', ['browser-sync', 'watch', 'less', 'plugins-js', 'site-js', 'html'], function () {
});

gulp.task('browser-sync', ['start'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: [output.js, output.css, input.html],
        browser: "google chrome",
        port: 5001,
	});
});

gulp.task('start', function (cb) {

	var started = false;

	return nodemon({
		script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

// gulp.task('start', function () {
//   nodemon({
//     script: 'app.js'
//   , ext: 'js html'
//   , env: { 'NODE_ENV': 'development' }
//   })
// });

function onError(err) {
    console.log(err);
}

gulp.task('less', function(){
    return gulp.src(input.mainLess)
        .pipe(less())
        .pipe(prefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest(output.css))
        .pipe(plumber({
            errorHandler: onError
        }));
});

gulp.task('plugins-js', function() {
  return gulp.src([input.jQuery, input.scrollMagic, input.jsLibs])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('plugins.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.js))
    .pipe(plumber({
        errorHandler: onError
    }));
});

gulp.task('site-js', function() {
  return gulp.src(input.jsSite)
    .pipe(gulp.dest('dist'))
    .pipe(rename('site.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(output.js))
    .pipe(plumber({
        errorHandler: onError
    }));
});

gulp.task('html', function() {
  return gulp.src(input.html)
    .pipe(plumber({
        errorHandler: onError
    }));
});

gulp.task('other-css', function() {
  return gulp.src(input.otherLess)
    //.pipe(livereload())
    .pipe(plumber({
        errorHandler: onError
    }));
});

//In conjunction with livereload chrome extension
gulp.task('watch', ['browser-sync'], function() {
  //livereload.listen();
  gulp.watch(input.otherLess, ['less']);
  gulp.watch(input.jsSite, ['site-js']);
  gulp.watch(input.html, ['html']);
});
