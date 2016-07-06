'use strict';

var fs = require('fs'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    gulp = require('gulp-param')(require('gulp'), process.argv),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    historyApiFallback = require('connect-history-api-fallback'),
    path = require('path'),
    del = require('del'),
    serveStatic  = require("serve-static"),
    resolve      = require("path").resolve;

var watchTask = function () {
    gulp.watch(['src/**/*.*'], reload);

};

var serveTask = function () {
    browserSync({
        port: 5000,
        notify: false,
        logPrefix: 'MS',
        online: false,
        logLevel: 'debug',
        logConnections: true,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: {
            logLevel: 'debug',
            baseDir: ['.'],
            route : {
                fake:'route'
            },
            middleware: [
                historyApiFallback()
            ]
        }
    }, function(err, bs) {

        var routes = [
            ['/extra', 'route'],
            ];
        routes.forEach(function(route){
            bs.app.use(route[0], serveStatic(resolve(route[1])));
        })

    });
};

gulp.task('watch', function () {
    return watchTask();
});
gulp.task('serve', ['default', 'watch'], function () {
    return serveTask();
});
gulp.task('default');
