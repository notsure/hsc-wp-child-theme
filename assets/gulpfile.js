// Include gulp.
const { src, dest, parallel, series } = require('gulp');

// Include our plugins.
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify-es').default;
const gulpTerser = require('gulp-terser');
const terser = require('terser');
const babel = require('gulp-babel');

function scss() {
    return src([
        './sass/style.scss'
      ])
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(concat('style.css'))
        .pipe(dest('dist'));
}

function exportToRoot() {
  return src([
    './sass/wordpress.css',
    './dist/style.css',
  ])
    .pipe(concat(`style.css`))
    .pipe(dest('../'));
}

function js() {
    return src('js/**/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(concat('scripts.js'))
      .pipe(gulpTerser({
        mangle: true,
        compress: true,
      }))
      .pipe(dest('dist'));
}

exports.default = series(
  parallel(scss),
  js,
  exportToRoot,
);
