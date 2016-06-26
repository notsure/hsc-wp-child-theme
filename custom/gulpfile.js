// Include gulp.
var gulp = require('gulp');

// Include our plugins.
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// Lint task.
gulp.task('lint', function() {
    return gulp
        .src('js/core/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile our less files.
gulp.task('sass', function() {
    return gulp
        .src([
            './sass/style.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        // .pipe(minifyCss({
        //     keepSpecialComments: 1
        // }))
        // .pipe(rename({
        //     suffix: ".min"
        // }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../'));
});

// Minify template core JS file.
gulp.task('build_js', function() {
    return gulp
        .src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('hsc.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../'));
});

// Watch files for changes.
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss',[
        'sass'
    ]);
    gulp.watch('js/**/*.js',[
        'lint',
        'build_js'
    ]);
    // gulp.watch('js/components/*.js',[
    //     'lint',
    //     'build_js'
    // ]);
});

// Default task.
gulp.task('build', [
    'sass',
    'lint',
    'build_js'
]);

// Default task.
gulp.task('default', [
    'watch'
]);
