import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import stylus from 'rollup-plugin-stylus-compiler';
// import stylus from 'rollup-plugin-stylus';
import css from 'rollup-plugin-css-porter';
import html from 'rollup-plugin-template-html';
import underscorify from 'rollup-plugin-underscorify';
import alias from 'rollup-plugin-import-alias';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const plugins = [
  alias({
    Paths: {
      '@js': './src/js',
      '@css': './src/css',
      '@tpl': './src/tpl',
    },
    Extensions: ['js', 'tpl', 'styl'],
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

  uglify(),
  stylus(),
  css({
    minified: false,
    raw: 'dist/styles.css',
    plugins: [
      autoprefixer(),
    ]
  }),

  underscorify({
    include: ['**/*.tpl'],
    variable: 'props',
  }),
  
  html({
    template: 'src/index.html',
  }),
];

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: plugins,
}