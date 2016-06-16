// Include gulp.
var gulp = require('gulp');

// Include our plugins.
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

// Compile our less files.
gulp.task('sass', function() {
    return gulp
        .src('./sass/style.scss')        // locate /less/ folder root to grab 4 main files
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))  // compile
        // .pipe(minifyCss({                // minify CSS
        //     keepSpecialComments: 1       // remove all comments
        // }))
        // .pipe(rename({                   // rename file
        //     suffix: ".min"               // add *.min suffix
        // }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../'));    // destination path for minified CSS
});

// Watch files for changes.
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss',[
        'sass'
    ]);
});

// Default task.
gulp.task('build', [
    'sass'
]);

// Default task.
gulp.task('default', [
    'watch'
]);
