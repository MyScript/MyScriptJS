import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

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
      exclude: 'node_modules/**'
    })
  ],
  watch: {
    include: 'src/**'
  }
};
