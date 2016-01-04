'use strict';

var fs = require('fs'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp = require('gulp-param')(require('gulp'), process.argv),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    plumber = require('gulp-plumber'),
    historyApiFallback = require('connect-history-api-fallback'),
    path = require('path'),
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

var dist = function (subpath) {
    return !subpath ? PROJECT.DIST : path.join(PROJECT.DIST, subpath);
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


// Clean output directory
gulp.task('clean', function() {
    return del([PROJECT.TMP, dist()]);
});

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
        .pipe(gulp.dest(dist()));
});

gulp.task('css', function (tag) {
    return gulp.src('src/**/*.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(concat(PROJECT.NAME + '.min.css'))
        .pipe(header(banner, {project: bower, version: tag}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist()));
});

gulp.task('serve', ['default'], function () {
    browserSync({
        port: 5000,
        notify: false,
        logPrefix: 'MSJS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: ['dist', 'demo'],
            middleware: [historyApiFallback()],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch(['demo/**/*.html'], reload);
    gulp.watch(['src/**/*.js'], ['js', reload]);
    gulp.watch(['src/**/*.css'], ['css', reload]);
});

gulp.task('default', ['clean', 'js', 'css']);
