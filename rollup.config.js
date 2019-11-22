import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import underscorify from 'rollup-plugin-underscorify';
import alias from 'rollup-plugin-import-alias';

const plugins = [
  alias({
    Paths: {
      '@js': './src/js',
      '@tpl': './src/tpl',
    },
    Extensions: ['js', 'tpl'],
  }),

  babel({
    presets: [
      '@babel/env',
    ],
    exclude: 'node_modules/**',
  }),

  resolve({
    browser: true,
  }),

  commonjs({
    include: 'node_modules/**',
  }),

  underscorify({
    include: ['**/*.tpl'],
    variable: 'props',
  }),
];
if (process.env.BUILD === 'production') {
  plugins.push(terser());
}

export default {
  input: 'src/index.js',
  output: {
    file: 'tmp/index.js',
    format: 'iife',
    sourcemap: process.env.BUILD === 'development',
  },
  plugins: plugins,
  treeshake: process.env.BUILD === 'production',
}
