import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import { argv } from 'yargs';
import historyAPIFallback from 'connect-history-api-fallback';


import npmpackage from './package.json';
import DEV_CONFIG from './config/gulp-dev-config.json';
import PROD_CONFIG from './config/gulp-prod-config.json';

const IS_PRODUCTION = typeof argv.production !== 'undefined';

const SRC = './src';
const DIST = './dist';
const JS = 'js';
const CSS = 'css';
const SCSS = 'scss';
const FONTS = 'fonts';

const MAIN = 'main.js';
const LIBS = 'libs.js';
const STATICS = [
  `${SRC}/**/*.+(ico|json|html|mp3|ttf)`,
  `!${SRC}/${SCSS}/**/*`,
];
const IMAGES = [
  `${SRC}/**/*.+(png|jpg|jpeg|gif|svg)`,
  `!${SRC}/${SCSS}/**/*`,
];
const FONT_SOURCES = [
  './node_modules/font-awesome/fonts/*',
];

const CONFIGS = './config/*.+(js(on)?)';

// Set the dependencies to all the dependencies and then any additional deps with '/'
const DEPENDENCIES = Object.keys(npmpackage.dependencies).concat([
  'history/lib/createBrowserHistory',
]);

// Convert dependencies into objects for bundling
const EXTERNALS = DEPENDENCIES.map(ext => {
  return { require: ext };
});


const CONFIG = IS_PRODUCTION ? PROD_CONFIG : DEV_CONFIG;


// =================================
// Gulp tasks

/* Clean the dist folder */
gulp.task('clean', (callback) => {
  return del([DIST], callback);
});


/* Copies fonts from node_modules to the dist folder */
gulp.task('fonts', () => {
  return gulp.src(FONT_SOURCES).pipe(gulp.dest(`${DIST}/${FONTS}`));
});


/* Minify (if prod) all the images and copy them to the dest folder */
gulp.task('images', () => {
  return gulp.src(IMAGES, { base: SRC })
    .pipe(IS_PRODUCTION ? cache(imagemin({
      interlaced: true,
    })) : gutil.noop())
    .pipe(gulp.dest(DIST));
});


/* Copy all the statics into the dist folder and if is production, replaces .css, .js with .min.css ir .min.js in html files */
gulp.task('statics', ['images'], () => {
  gulp.src(STATICS, { base: SRC })
    .pipe(gulp.dest(DIST));

  if(!IS_PRODUCTION) {
    return;
  }

  // replaces .css and .js with .min prefixed.
  return gulp.src(SRC + '/**/*.html')
    .pipe(replace(/\.(js|css)/g, '.min.$1'))
    .pipe(gulp.dest(DIST));
});
gulp.task('statics-watch', ['statics'], browserSync.reload);


gulp.task('styles', () => {
  return gulp.src(`${SRC}/${SCSS}/main.scss`)
    .pipe(sass(CONFIG.sass))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 version'],
      }),
    ]))
    .pipe(IS_PRODUCTION ? rename({ suffix: '.min' }) : gutil.noop())
    .pipe(IS_PRODUCTION ? gutil.noop() : sourcemaps.init({ loadMaps: true }))
    .pipe(IS_PRODUCTION ? gutil.noop() : sourcemaps.write('./'))
    .pipe(gulp.dest(`${DIST}/${CSS}`))
    .pipe(IS_PRODUCTION ? gutil.noop() : browserSync.reload({ stream: true, match: '**/*.css' }));
});
gulp.task('styles-watch', ['styles']);


gulp.task('lint', () => {
  return gulp.src(`${SRC}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(IS_PRODUCTION ? eslint.failOnError() : gutil.noop());
});


function bundle(b, fileName, type) {
  return b.bundle()
    .on('error', function(err) {
      gutil.log(gutil.colors.red(`${type} ERROR`), err.message);
      this.emit('end');
    })
    .pipe(source(fileName))
    .pipe(buffer())
    .pipe(IS_PRODUCTION ? uglify() : sourcemaps.init({ loadMaps: true }))
    .pipe(IS_PRODUCTION ? rename({ suffix: '.min' }) : sourcemaps.write('./'))
    .pipe(gulp.dest(`${DIST}/${JS}`));
}


/* Bundles the main script, distributes it, and adds references to the libs */
gulp.task('scripts', () => {
  const b = browserify(CONFIG.browserify);
  b.add(`${SRC}/${JS}/${MAIN}`);
  b.transform(babelify);

  EXTERNALS.forEach(ext => {
    if(ext.expose) {
      b.external(ext.expose);
    } else {
      b.external(ext.require);
    }
  });

  return bundle(b, MAIN, 'SCRIPTS');
});
gulp.task('scripts-watch', ['scripts'], browserSync.reload);


/* Bundle the libs scripts to be used from the main app */
gulp.task('scripts:libs', () => {
  const b = browserify();
  EXTERNALS.forEach(ext => {
    if(ext.expose) {
      b.require(ext.require, { expose: ext.expose });
    } else {
      b.require(ext.require);
    }
  });

  return bundle(b, LIBS, 'LIBS');
});


gulp.task('dist', ['scripts', 'scripts:libs', 'styles', 'fonts', 'statics']);


gulp.task('serve', ['dist'], () => {
  browserSync({
    server: {
      baseDir: DIST,
      middleware: [ historyAPIFallback() ],
    },
  });

  gulp.watch(`${SRC}/${JS}/**/*.js`, ['scripts-watch']);
  gulp.watch(`${SRC}/${SCSS}/**/*.scss`, ['styles-watch']);
  gulp.watch(STATICS.concat(CONFIGS), ['statics-watch']);
});


gulp.task('default', ['serve']);
