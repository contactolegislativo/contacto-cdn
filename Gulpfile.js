'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('html', function() {
    gulp.src('src/html/**.html')
        .pipe(gulp.dest('./dist/html'));
});

gulp.task('img', function() {
    gulp.src('src/img/**.*')
        .pipe(gulp.dest('./dist/img'));
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
