import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import gutil from 'gulp-util';
import esdoc from 'gulp-esdoc';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackBrowserPlugin from 'webpack-browser-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import blanket from 'gulp-blanket-mocha';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import webpackConfig from './webpack.config.babel';

const eslint = require('gulp-eslint');

// Creation of webpack config
const myWebpackConfig = Object.create(webpackConfig);

gulp.task('doc', () =>
    gulp.src('./src').pipe(esdoc())
);

gulp.task('minify-css', () => gulp.src('./src/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
);

// Check if code respect the Air B&B rules
gulp.task('lint', () =>
    gulp.src(['src/**/*.js', '!node_modules/**', 'test/**'])
        .pipe(eslint())
        .pipe(eslint.format())
);


// Launch the code check every time a file move
gulp.task('watch-lint', ['lint'], () =>
    gulp.watch(['src/**', 'test/**'], ['lint'])
);

// Transpile sources from ES6 to ES5
gulp.task('babel', () => {
  gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('target'));
  gulp.src('src/**/*.css').pipe(gulp.dest('dist'));
});

gulp.task('test', ['babel'], () => gulp.src('test/**/*.js')
    .pipe(mocha())
    .on('error', () => {
      gulp.emit('end');
    })
);

gulp.task('watch-test', () => gulp.watch(['src/**', 'test/**'], ['test']));

// Config to build for a release
gulp.task('webpack', ['test', 'doc'], (callback) => {
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
  myConfig.plugins.push(new WebpackBrowserPlugin({
    port: '',
    url: 'http://localhost:8080/samples/index.html'
  }));
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myWebpackConfig), {
    contentBase: '.',
    publicPath: '/dev/' + myConfig.output.publicPath,
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
gulp.task('watch', ['server']);
gulp.task('build', ['webpack', 'minify-css']);
gulp.task('default', ['build']);

/* ****************************************************************************
 * Testing section.
 * This is not currently working. Still some improvements before being ready.
 *****************************************************************************/

gulp.task('coverage', () => gulp.src('test/**/*.js')
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(blanket({ instrument: ['src/**/*.js'], captureFile: 'coverage.html', reporter: 'html-cov' }))
    .on('error', () => {
      gulp.emit('end');
    })
);

gulp.task('blanketTest', ['babel'], () => {
  gulp.src('test/**/*.js')
      .pipe(mocha({ reporter: 'spec' }))
      .pipe(blanket({ instrument: ['src/**/*.js'], captureFile: 'coverage.html', reporter: 'html-cov' }));
  // gulp.src('./coverage.html').pipe(open());
});
