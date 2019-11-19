import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import stylusCompiler from 'rollup-plugin-stylus-compiler';
import stylus from 'stylus';
// import html from 'rollup-plugin-template-html';
import underscorify from 'rollup-plugin-underscorify';
import alias from 'rollup-plugin-import-alias';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

import build from './build.js';

const plugins = [
  alias({
    Paths: {
      '@js': './src/js',
      '@css': './src/css',
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

  // stylusCompiler({
  //   'rawDefine': { 'inline-image': stylus.url() },
  // }),

  // postcss({
  //   include: '**/*.css',
  //   extract: true,
  //   minimize: process.env.BUILD === 'production',
  //   plugins: [
  //     autoprefixer([
  //       'ie >= 8',
  //       'last 4 version',
  //     ]),
  //   ]
  // }),

  underscorify({
    include: ['**/*.tpl'],
    variable: 'props',
  }),
];
if (process.env.BUILD === 'production') {
  plugins.push(uglify());
}

export default {
  input: 'src/index.js',
  output: {
    file: 'tmp/index.js',
    format: 'iife',
    sourcemap: process.env.BUILD === 'development',
  },
  treeshake: process.env.BUILD === 'production',
  plugins: plugins,
}

console.log(process.env.BUILD);