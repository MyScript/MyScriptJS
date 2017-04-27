import fs from 'fs';
import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import mocha from 'gulp-mocha';
import gutil from 'gulp-util';
import esdoc from 'gulp-esdoc';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackNotifierPlugin from 'webpack-notifier';
import WebpackOpenBrowserPlugin from 'open-browser-webpack-plugin';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import webpackConfig from './webpack.config.babel';

const eslint = require('gulp-eslint');

// Creation of webpack config
const myWebpackConfig = Object.create(webpackConfig);

// Copy the required fonts for MyScriptJS in the build directory
gulp.task('fonts', () =>
  gulp.src('./src/**/*.otf')
    .pipe(gulp.dest('dist'))
);

// Generate a minify version for css.
gulp.task('minify-css', () =>
  gulp.src('./src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
);

// Launch local mocha test. Used mostly to test non graphical part of the library (a few)
gulp.task('test', () =>
  gulp.src('./test/**/*.js')
    .pipe(mocha({ reporter: 'xunit', reporterOptions: { output: './test/mocha/results/xunit.xml' } }))
    // .pipe(mocha())
    .on('error', () => {
      gulp.emit('end');
    })
);

// Config to build for a release
gulp.task('webpack', ['fonts', 'minify-css', 'test'], (callback) => {
  // run webpack
  const releaseConfig = Object.create(myWebpackConfig);
  releaseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));

  webpack(releaseConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({ colors: true, progress: true }));
    callback();
  });
});


// Launch a local server to test dev continuously. Rebuild and lint on every modification. Css are not build in this pipeline (very small file).
gulp.task('server', (callback) => {

  const devConf = {
    publicPath: '/dist/',
    stats: {
      colors: true
    },
    hot: true,
    host: 'localhost',
    port: 8080
  };

  // modify some webpack config configuration
  const myConfig = Object.create(myWebpackConfig);
  // The two following properties helps having an easy debuggable map file.
  myConfig.devtool = 'eval';
  myConfig.debug = true;
  myConfig.output.pathinfo = true;
  // Add hot reload.
  myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Notify on build.
  myConfig.plugins.push(new WebpackNotifierPlugin({ title: 'Webpack', excludeWarnings: true }));
  // Open the browser on dev server launch.
  myConfig.plugins.push(new WebpackOpenBrowserPlugin({ url: `http://${devConf.host}:${devConf.port}/samples/index.html` }));

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myWebpackConfig), devConf)
    .listen(devConf.port, devConf.host, (err) => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      gutil.log('[webpack-dev-server]', `http://${devConf.host}:${devConf.port}/samples/index.html`);
      callback();
    });
});

// Generate documentation
gulp.task('doc', () => gulp.src('./src').pipe(esdoc()));

// Check if code respect the Air B&B rules
gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'test/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('junit', fs.createWriteStream('./test/eslint.xml')))
    .pipe(eslint.failAfterError())
);

// Launch the code check every time a file move
gulp.task('watch', ['build'], () => gulp.watch(['src/**', 'test/**', 'src/**/*.css'], ['build']));

gulp.task('serve', ['minify-css', 'server']);

// Shortcut to rebuild dist directory. Please use this command before committing to always have the last build version in git.
gulp.task('build', ['lint', 'webpack', 'doc']);

// The main task
gulp.task('default', ['build']);
