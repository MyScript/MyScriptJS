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

gulp.task('fonts', () =>
    gulp.src('./src/**/*.otf')
        .pipe(gulp.dest('dist'))
);


gulp.task('minify-css', () =>
    gulp.src('./src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);

gulp.task('test', () =>
    gulp.src('./test/**/*.js')
        .pipe(mocha())
        .on('error', () => {
          gulp.emit('end');
        })
);

// Config to build for a release
gulp.task('webpack', ['fonts', 'minify-css', 'test'], (callback) => {
  // run webpack
  const releaseConfig = Object.create(myWebpackConfig);
  releaseConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

  webpack(releaseConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({ colors: true, progress: true }));
    callback();
  });
});

gulp.task('server', (callback) => {
  // modify some webpack config options
  const myConfig = Object.create(myWebpackConfig);
  // The two following properties helps having an easy debugable map file.
  myConfig.devtool = 'eval';
  myConfig.debug = true;
  myConfig.output.pathinfo = true;
  // Add hot reload.
  myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Notify on build.
  myConfig.plugins.push(new WebpackNotifierPlugin({ title: 'Webpack', excludeWarnings: true }));
  // Open the browser on dev server launch.
  myConfig.plugins.push(new WebpackOpenBrowserPlugin({
    url: 'http://localhost:8080/samples/index.html'
  }));
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myWebpackConfig), {
    publicPath: '/dist/',
    stats: {
      colors: true
    },
    hot: true
  }).listen(8080, '0.0.0.0', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://127.0.0.1:8080/samples/index.html');
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
        .pipe(eslint.failAfterError())
);

// Launch the code check every time a file move
gulp.task('watch', ['build'], () => gulp.watch(['src/**', 'test/**', 'src/**/*.css'], ['build']));

gulp.task('serve', ['minify-css', 'server']);
gulp.task('build', ['lint', 'webpack', 'doc']);
gulp.task('default', ['build']);
