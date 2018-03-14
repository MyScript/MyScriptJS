import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/myscript.js',
  output: [
    { file: 'dist/myscript.min.esm.js', format: 'es' },
    {
      name: 'MyScript',
      file: 'dist/myscript.min.js',
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
    })
  ]
};
