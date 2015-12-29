'use strict';

var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('css', ['clean:css'], function(){
  return gulp.src(['src/*.less'])
    .pipe(less())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'android > 2.3'] }) ]))
    .pipe(concat('videojs.markers.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('css:min', ['css'], function(){
  return gulp.src('dist/videojs.markers.css')
    .pipe(minifyCss())
    .pipe(rename('videojs.markers.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', ['clean:js'], function(){
  return gulp.src(['src/*.js'])
    .pipe(concat('videojs.markers.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('js:min', ['js'], function(){
  gulp.src('dist/videojs.markers.js')
    .pipe(uglify())
    .pipe(rename('videojs.markers.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  gulp.watch('src/*.less', ['css']);
  gulp.watch('src/*.js', ['js']);
});

gulp.task('clean:css', function(){
  return del(['dist/*.css']);
});

gulp.task('clean:js', function(){
  return del(['dist/*.js']);
});

gulp.task('default', ['css', 'js', 'watch']);

gulp.task('build', ['css:min', 'js:min']);
