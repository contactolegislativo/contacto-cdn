'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dist/css/'))
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/css/fonts'));
    gulp.src('node_modules/datatables/media/css/*')
        .pipe(gulp.dest('./dist/css/datatables/css'));
    gulp.src('node_modules/datatables/media/images/*')
        .pipe(gulp.dest('./dist/css/datatables/images'));
});

gulp.task('minify-css', () => {
  return gulp.src('./dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('html', function() {
    gulp.src('src/html/*')
        .pipe(gulp.dest('./dist/html'));
    gulp.src('src/html/districts/**')
        .pipe(gulp.dest('./dist/html/districts'));
});

gulp.task('img', function() {
    gulp.src('src/img/**.*')
        .pipe(gulp.dest('./dist/img'));
        gulp.src('src/img/deputies/**.*')
            .pipe(gulp.dest('./dist/img/deputies'));
});

gulp.task('js', function() {
    gulp.src('src/js/**.*')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['html', 'img', 'sass'], function() {
  console.log('Task completed');
});

//Watch task
gulp.task('default',function() {
    gulp.watch('src/sass/**/*.scss',['sass']);
});
