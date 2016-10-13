import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackNotifierPlugin from 'webpack-notifier';
import blanket from 'gulp-blanket-mocha';
import open from 'open';
import webpackConfig from './webpack.config.babel';

const eslint = require('gulp-eslint');

// Creation of webpack config
const myWebpackConfig = Object.create(webpackConfig);

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

gulp.task('webpack', ['test'], (callback) => {
  // run webpack
  webpack(myWebpackConfig, (err, stats) => {
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
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myWebpackConfig), {
    contentBase: '.',
    publicPath: '/dev/' + myConfig.output.publicPath,
    stats: {
      colors: true
    },
    hot: true
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://127.0.0.1:8080/samples/');
    open('http://localhost:8080/samples/');
    callback();
  });
});

gulp.task('watch', ['server']);

gulp.task('default', ['webpack']);

/* ****************************************************************************
 * Testing section.
 * This is not currently working. Still some improvements before behing ready.
 *****************************************************************************/

gulp.task('coverage', () => gulp.src('test/**/*.js')
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(blanket({ instrument: ['new_src/**/*.js'], captureFile: 'coverage.html', reporter: 'html-cov' }))
    .on('error', () => {
      gulp.emit('end');
    })
);

gulp.task('blanketTest', ['babel'], () => {
  gulp.src('test/**/*.js')
      .pipe(mocha({ reporter: 'spec' }))
      .pipe(blanket({ instrument: ['new_src/**/*.js'], captureFile: 'coverage.html', reporter: 'html-cov' }));
  // gulp.src('./coverage.html').pipe(open());
});
