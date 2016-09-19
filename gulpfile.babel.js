/*eslint one-var: 0 */

// Core deps
// Use require() because of rollup babel preset
const gulp = require('gulp');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const gulprun = require('run-sequence');
const yargs = require('yargs');
const browserSync = require('browser-sync');
const wct = require('web-component-tester');

// JS
const eslint = require('gulp-eslint');
const rollup = require('gulp-rollup-file');
const resolve = require('rollup-plugin-node-resolve');
const commonJs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const nodeGlobals = require('rollup-plugin-node-globals');
const replace = require('rollup-plugin-replace');

const wctConfig = require('./wct.conf.js');

const bs = browserSync.create(),
      argv = yargs.boolean(['debug']).argv,
      errorNotifier = () => plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
      OPTIONS = {
        rollup: {
          plugins: [
            resolve({
              main: true,
              jsnext: true,
              browser: true,
            }),
            commonJs({
              exclude: [
                './node_modules/process-es6/browser.js',
                './node_modules/rollup-plugin-node-globals/src/global.js',
                './node_modules/symbol-observable/es/index.js'
              ]
            }),
            babel(),
            nodeGlobals(),
            replace({
              'process.env.NODE_ENV': argv.debug ? '"development"' : '"production"'
            })
          ],
          format: 'umd',
          moduleName: 'Simpla',
          moduleId: 'Simpla'
        },
        uglify: {
          mangle: !argv.debug
        },
        browserSync: {
          server: {
            baseDir: './',
            index: 'demo/index.html',
            routes: {
              '/': './bower_components'
            }
          },
          open: false,
          notify: false
        }
      };

wct.gulp.init(gulp);

gulp.task('build', () => {
  return gulp.src('src/simpla.js')
          .pipe(errorNotifier())

            .pipe(gulpif(argv.debug, sourcemaps.init()))
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(gulpif(!argv.debug, eslint.failAfterError()))
            .pipe(rollup(OPTIONS.rollup))

            // Minify and pipe out
            .pipe(gulpif(!argv.debug, uglify(OPTIONS.uglify)))
            .pipe(gulpif(argv.debug, sourcemaps.write()))
            .pipe(rename({ dirname: '' }))
            .pipe(size({ gzip: true }))

          .pipe(gulp.dest('.'));
});

gulp.task('build:tests', () => {
  return gulp.src(['test/**/*.js', '!test/__**/*'])
          .pipe(errorNotifier())

            .pipe(gulpif(argv.debug, sourcemaps.init()))
            .pipe(rollup(OPTIONS.rollup))

            // Minify and pipe out
            .pipe(gulpif(argv.debug, sourcemaps.write()))
            .pipe(size({ gzip: true }))

          .pipe(gulp.dest(wctConfig.suites[0]));
});

gulp.task('demo', (callback) => bs.init(OPTIONS.browserSync));

gulp.task('refresh', () => bs.reload());

gulp.task('test', ['build', 'build:tests', 'test:local']);

gulp.task('watch:src', () => gulp.watch(['src/**/*'], () => gulprun('build', 'refresh')));

gulp.task('watch:tests', () => gulp.watch(['test/**/*', 'src/**/*'], ['build:tests']));

gulp.task('watch', [ 'watch:src', 'watch:tests' ]);

gulp.task('default', ['build', 'build:tests', 'demo', 'watch']);
