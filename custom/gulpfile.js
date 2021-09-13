// Include gulp.
const { src, dest, parallel, series } = require('gulp');

// Include our plugins.
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

function scss() {
    return src([
        './sass/style.scss'
      ])
        .pipe(sourcemaps.init())
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write())
        .pipe(dest('dist'));
}

function exportToRoot() {
  return src([
    './sass/wordpress.css',
    './dist/style.css',
  ])
    .pipe(concat('style.css'))
    .pipe(dest('../'));
}

function js() {
    return src('js/**/*.js', { sourcemaps: true })
      .pipe(concat('hsc.min.js'))
      .pipe(dest('../', { sourcemaps: true }))
}

exports.js = js;
exports.scss = scss;
exports.default = series(
  parallel(scss, js),
  exportToRoot
);
