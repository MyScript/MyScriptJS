'use strict';

var fs = require('fs'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp = require('gulp-param')(require('gulp'), process.argv),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    plumber = require('gulp-plumber'),
    historyApiFallback = require('connect-history-api-fallback'),
    path = require('path'),
    del = require('del'),
    yuidoc = require("gulp-yuidoc");

var fileList = JSON.parse(fs.readFileSync('build.json'));
var bower = JSON.parse(fs.readFileSync('bower.json'));

var docTask = function(src, dest) {
    return gulp.src(src)
        .pipe(yuidoc())
        .pipe(gulp.dest(dest));
};

var cleanTask = function(src) {
    return del(src);
};

var scriptTask = function (src, dest, conf) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(sourcemaps.init())
        .pipe(replace(/'use strict';/g, ''))
        .pipe(concat(conf.name + '.js'))
        .pipe(gulp.dest(dest))
        .pipe(uglify())
        .pipe(header('/**\n' +
            ' * <%= project.name %> - <%= project.description %>\n' +
            ' * @version <%= project.version %>\n' +
            ' * @link <%= project.homepage %>\n' +
            ' * @license <%= project.license %>\n' +
            ' */\n' +
            '', {project: conf}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
};

var styleTask = function (src, dest, conf) {
    return gulp.src(src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat(conf.name + '.css'))
        .pipe(gulp.dest(dest))
        .pipe(minifyCss())
        .pipe(header('/**\n' +
            ' * <%= project.name %> - <%= project.description %>\n' +
            ' * @version <%= project.version %>\n' +
            ' * @link <%= project.homepage %>\n' +
            ' * @license <%= project.license %>\n' +
            ' */\n' +
            '', {project: conf}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest));
};

var watchTask = function () {
    gulp.watch(['demo/**/*.html'], reload);
    gulp.watch(['src/**/*.js'], ['js', reload]);
    gulp.watch(['src/**/*.css'], ['css', reload]);
};

var serveTask = function () {
    browserSync({
        port: 5000,
        notify: false,
        logPrefix: 'MSJS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            baseDir: ['demo', 'bower_components'],
            middleware: [historyApiFallback()],
            routes: {
                '/dist': 'dist'
            }
        }
    });
};

gulp.task('doc', function () {
    return docTask(fileList, 'docs/api');
});
gulp.task('clean', function () {
    return cleanTask(['.tmp', 'dist']);
});
gulp.task('js', function (tag) {
    var conf = {
        name: bower.name,
        description: bower.description,
        version: tag || bower.version,
        homepage: bower.homepage,
        license: bower.license
    };
    return scriptTask(fileList, 'dist', conf);
});
gulp.task('css', function (tag) {
    var conf = {
        name: bower.name,
        description: bower.description,
        version: tag || bower.version,
        homepage: bower.homepage,
        license: bower.license
    };
    return styleTask('src/**/*.css', 'dist', conf);
});
gulp.task('watch', function () {
    return watchTask();
});
gulp.task('serve', ['default', 'watch'], function () {
    return serveTask();
});
gulp.task('default', ['clean', 'js', 'css']);
