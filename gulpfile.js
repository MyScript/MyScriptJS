'use strict';

var fs = require('fs'),
    gulp = require('gulp-param')(require('gulp'), process.argv),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    plumber   = require('gulp-plumber'),
    del = require('del');

var PROJECT = {
    // variables
    NAME: 'myscript',
    SRC: 'src/',
    RESOURCES: 'resources/',
    TMP: '.tmp/',
    TEST: 'test/',
    UNIT: 'unit/',
    DIST: 'dist/',
    DOC: 'docs/',
    RESULT: 'test_results/'
};

var fileList = JSON.parse(fs.readFileSync('build.json'));
var bower = JSON.parse(fs.readFileSync('bower.json'));

var banner = ['/**',
    ' * <%= project.name %> - <%= project.description %>',
    ' * @version <%= version %>',
    ' * @link <%= project.homepage %>',
    ' * @license <%= project.license %>',
    ' */',
    ''].join('\n');

gulp.task('js', function (tag) {
    return gulp.src(fileList)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(sourcemaps.init())
        .pipe(replace(/'use strict';/g, ''))
        .pipe(uglify())
        .pipe(concat(PROJECT.NAME + '.min.js'))
        .pipe(header(banner, {project: bower, version: tag}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PROJECT.DIST));
});

gulp.task('css', function (tag) {
    return gulp.src('src/**/*.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(concat(PROJECT.NAME + '.min.css'))
        .pipe(header(banner, {project: bower, version: tag}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PROJECT.DIST));
});

gulp.task('build', ['js', 'css']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.css', ['css']);
});

gulp.task('default', ['watch']);
