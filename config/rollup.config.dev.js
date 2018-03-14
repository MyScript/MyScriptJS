import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'src/myscript.js',
  output: [
    { file: 'dist/bundle.esm.js', format: 'es' },
    {
      name: 'MyScript',
      file: 'dist/bundle.js',
      format: 'umd',
      exports: 'named'
    }
  ],
  plugins: [
    json(),
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/loglevel/lib/loglevel.js': ['noConflict'],
      }
    }),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['env', { modules: false }]
      ],
      plugins: [
        'external-helpers'
      ]
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: '',
      host: 'localhost',
      port: 8080,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }),
    livereload({
      watch: [
        'dist',
        'examples'
      ]
    })
  ],
  watch: {
    include: 'src/**'
  }
};
