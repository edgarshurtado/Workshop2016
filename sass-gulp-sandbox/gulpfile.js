'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
      return gulp.src('./sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./css'));
});

gulp.task('sass:watcher', function(){ //execute gulp sass:watcher to make
                                      // it work
    gulp.watch('./sass/**/*.scss', ['sass']);
});

