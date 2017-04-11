/*eslint one-var: 0 */

// Core deps
// Use require() because of rollup babel preset
const gulp = require('gulp');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const lazypipe = require('lazypipe');
const gulprun = require('run-sequence');
const yargs = require('yargs');
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

const argv = yargs.boolean(['debug']).argv,
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
        }
      };

wct.gulp.init(gulp);

const processJs = lazypipe()
  .pipe(() => gulpif(argv.debug, sourcemaps.init()))
  .pipe(rollup, OPTIONS.rollup)
  .pipe(() => gulpif(argv.debug, sourcemaps.write()))

gulp.task('lint', () => {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(!argv.debug, eslint.failAfterError()));
});

gulp.task('build', () => {
  return gulp.src('src/*.js')
    .pipe(errorNotifier())

      .pipe(processJs())

    .pipe(gulp.dest('.'))

      .pipe(gulpif(!argv.debug, uglify(OPTIONS.uglify)))
      .pipe(rename(path => path.extname = '.min.js'))
      .pipe(size({ gzip: true }))

    .pipe(gulp.dest('.'));
});

gulp.task('build:tests', () => {
  return gulp.src(['test/index.js'])
    .pipe(errorNotifier())
      .pipe(processJs())
    .pipe(gulp.dest(wctConfig.suites[0]));
});

gulp.task('test', () => gulprun(['lint', 'build', 'build:tests'], 'test:local'));

gulp.task('watch:src', () => gulp.watch(['src/**/*'], ['lint', 'build']));
gulp.task('watch:tests', () => gulp.watch(['test/**/*', 'src/**/*'], ['build:tests']));
gulp.task('watch', ['watch:src', 'watch:tests']);

gulp.task('default', ['lint', 'build', 'build:tests', 'watch']);
