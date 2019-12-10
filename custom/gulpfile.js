// Include gulp.
const { src, dest, parallel } = require('gulp');

// Include our plugins.
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

function scss() {
    return src([
            './sass/style.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write())
        .pipe(dest('../'));
}

function js() {
    return src('js/**/*.js', { sourcemaps: true })
        .pipe(concat('hsc.min.js'))
        .pipe(dest('../', { sourcemaps: true }))
}

exports.js = js;
exports.scss = scss;
exports.default = parallel(scss, js);
