'use strict';

var gulp = require('gulp'),
    map = require('map-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');


gulp.task('libs', function () {
    gulp.src([
            'node_modules/chance/dist/chance.min.js',
            'node_modules/handlebars/dist/handlebars.min.js'
        ], {base:'./app/libs'})
        .pipe(map(stripPaths))
        .pipe(gulp.dest('./app/libs'));
});

gulp.task('scripts', function () {
    gulp.src([
            'src/**/*.js'
        ], {base:'./app'})
        .pipe(map(stripPaths))
        .pipe(gulp.dest('./app'));
});

gulp.task('html', function () {
    gulp.src([
            'src/**/*.html'
        ], {base:'./src'})
        .pipe(gulp.dest('./app'));
});

gulp.task('styles', function () {
    gulp.src([
            'src/**/*.scss'
        ], {base:'./app'})
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./app'));
});

/* Watcher */

gulp.task('watch', function () {
    gulp.watch(['./src/**/*.js'], ['libs','scripts']);
    gulp.watch(['./src/**/*.scss'], ['styles']);
    gulp.watch(['./src/**/*.html'], ['html']);
});


function stripPaths(file, cb) {
    file.path = file.base+'/'+file.path.split('/').pop();
    cb(null, file);
};