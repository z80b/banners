const gulp         = require('gulp');
const args         = require('yargs').argv;
const browsersync  = require("browser-sync").create();
const twig         = require("gulp-twig");
const inlinesource = require('gulp-inline-source');

const rollup       = require('rollup');
const babel        = require('rollup-plugin-babel');
const resolve      = require('rollup-plugin-node-resolve');
const commonjs     = require('rollup-plugin-commonjs');
const terser       = require("rollup-plugin-terser").terser;
const underscorify = require('rollup-plugin-underscorify');
const alias        = require('rollup-plugin-import-alias');

const stylus       = require('gulp-stylus');
const axis         = require('axis');
const autoprefixer = require('gulp-autoprefixer');


const debug = true;

const rollupPlugins = [
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

if (args.mode == 'production') {
  rollupPlugins.push(terser());
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./tmp/"
    },
    port: 3000,
    serveStatic: [{
      route: '/static',
      dir: 'public'
    }]
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function buildScripts() {
  return rollup.rollup({
    input: 'src/js/index.js',
    plugins: rollupPlugins,
    treeshake: args.mode == 'production',
  }).then(bundle => {
    return bundle.write({
      file: 'tmp/index.js',
      format: 'iife',
      sourcemap: args.mode != 'production',
    });
  });
}

function buildStyles() {
	return gulp.src('src/css/index.styl')
    .pipe(stylus({
        'include css': true,
        'compress': args.mode == 'production',
        'rawDefine': { 'inline-image': stylus.stylus.url() },
        'use': axis(),
    }))
    .pipe(autoprefixer(['> 0%']))
		.pipe(gulp.dest('tmp/'));
}

function buildHtml() {
  return gulp.src('src/html/index.html')
    .pipe(twig())
    .pipe(inlinesource())
    .pipe(gulp.dest('tmp/'));
}

function buildBanner() {
  return gulp.src('src/html/banner.html')
    .pipe(inlinesource())
    .pipe(gulp.dest('dest/'));
}

function watchFiles() {
  // gulp.series(buildScripts, buildStyles, buildHtml);
  gulp.watch('./src/css/**/*.styl', gulp.series(buildStyles, buildHtml, browserSyncReload));
  gulp.watch('./src/js/**/*.js', gulp.series(buildScripts, buildHtml, browserSyncReload));
  gulp.watch('./src/tpl/**/*.tpl', gulp.series(buildScripts, buildHtml, browserSyncReload));
  gulp.watch('./src/html/*.html', gulp.series(buildHtml, browserSyncReload));
}

const build = gulp.series(buildScripts, buildStyles, buildBanner);
const watch = gulp.parallel(watchFiles, browserSync);
const start = gulp.series(buildScripts, buildStyles, buildHtml, watch);

exports.styles = buildStyles;
exports.scripts = buildScripts;
exports.html = buildScripts;
exports.build = build;
exports.watch = watch;
exports.start = start;
exports.default = build;