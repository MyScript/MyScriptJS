import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import blanket from 'gulp-blanket-mocha';
import open from 'gulp-open';
import webpackConfig from './webpack.config.babel';


const eslint = require('gulp-eslint');

gulp.task('lint', () =>
              gulp.src(['new_src/**/*.js', '!node_modules/**', 'test/**'])
              // eslint() attaches the lint output to the "eslint" property
              // of the file object so it can be used by other modules.
                  .pipe(eslint())
                  // eslint.format() outputs the lint results to the console.
                  // Alternatively use eslint.formatEach() (see Docs).
                  .pipe(eslint.format())
          // To have the process exit with an error code (1) on
          // lint error, return the stream and pipe to failAfterError last.
          //.pipe(eslint.failAfterError());
);

gulp.task('watch-lint', ['lint'], () =>
    gulp.watch(['new_src/**', 'test/**'], ['lint'])
);


gulp.task('default', ['webpack']);

gulp.task('babel', () => gulp.src('new_src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('target'))
);

gulp.task('test', ['babel'], () => gulp.src('test/**/*.js')
    .pipe(mocha())
    .on('error', () => {
      gulp.emit('end');
    })
);

gulp.task('watch-test', () => gulp.watch(['new_src/**', 'test/**'], ['test']));

gulp.task('webpack', ['test'], (callback) => {
  const myConfig = Object.create(webpackConfig);
  myConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];

  // run webpack
  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({ colors: true, progress: true }));
    callback();
  });
});

gulp.task('server', ['webpack'], (callback) => {
  // modify some webpack config options
  const myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/' + myConfig.output.publicPath,
    stats: {
      colors: true
    },
    hot: true
  }).listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/test/html/loading.html');
  });
});

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
  //gulp.src('./coverage.html').pipe(open());
});


gulp.task('watch', ['watch-test']);

gulp.task('watch-server', () => gulp.watch(['new_src/**'], ['webpack']));