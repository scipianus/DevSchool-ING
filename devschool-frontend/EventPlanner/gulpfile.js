"use strict";

var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    $ = require('gulp-load-plugins')();

gulp.task('analyze', function () {
    gulp.src(['src/**/*.js', 'gulpfile.js', '!src/vendor/**/*.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs())
        .pipe($.jscs.reporter())
        .pipe($.jscs.reporter('fail'));
});

gulp.task('inject', function () {
    var injectCss = gulp.src('src/*.css'),
        injectJs = gulp.src('src/app/**/*.js')
            .pipe($.angularFilesort());

    return gulp.src('src/app.html')
        .pipe(wiredep())
        .pipe($.inject(injectJs, {relative: true}))
        .pipe($.inject(injectCss, {relative: true}))
        .pipe(gulp.dest('src'));
});

gulp.task('serve', ['inject'], function () {
    gulp.src('src')
        .pipe($.serverLivereload({
            livereload: true,
            open: true,
            defaultFile: 'app.html'
        }));
});

gulp.task('serveBuild', ['build'], function () {
    gulp.src('build')
        .pipe($.serverLivereload({
            livereload: true,
            open: true,
            defaultFile: 'app.html'
        }));
});

gulp.task('other', function () {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src(['src/**/*', '!src/vendor/**/*', '!src/**/*.{css,js}'])
        .pipe(fileFilter)
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['inject', 'other'], function () {
    return gulp.src('src/app.html')
        .pipe($.useref())
        .pipe($.if('*.js', $.ngAnnotate()))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cleanCss()))
        .pipe(gulp.dest('build'));
});