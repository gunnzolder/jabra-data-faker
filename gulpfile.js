'use strict';

var gulp = require('gulp'),
    map = require('map-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jsonminify = require('gulp-jsonminify'),
    inject = require('gulp-inject');


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
            'src/chance.mixins.js',
            'src/app.js',
            'src/single.js'
        ], {base:'./app'})
        .pipe(map(stripPaths))
        //.pipe(concat('app.js'))
        .pipe(gulp.dest('./app'));
});

gulp.task('html', function () {

    var events = gulp.src('./src/data/events.json').pipe(jsonminify());
    var headers = gulp.src('./src/data/headers.json').pipe(jsonminify());

    function fileContents (filePath, file) {
        return file.contents.toString('utf8');
    }

    function injectOptions(id) {
        return {
            starttag: 'id="'+id+'">',
            endtag: "</script>",
            transform: fileContents
        }
    }

    gulp.src([
            'src/**/index.html'
        ], {base:'./src'})
        //.pipe(inject(headers, { transform: fileContents }))
        .pipe(inject(events,injectOptions('json-events')))
        .pipe(inject(headers,injectOptions('json-headers')))
        .pipe(gulp.dest('./app'));

    gulp.src([
            'src/**/single-request.html'
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