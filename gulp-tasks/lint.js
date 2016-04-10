/*
@license
Copyright (c) 2016 GDG Spain
This code may only be used under the MIT style license found at LICENSE.txt
*/

'use strict';

var eslint = require('gulp-eslint');
var gulp = require('gulp');

// Lint JavaScript
gulp.task('lint', function() {
  return gulp.src([
      'app/elements/**/*.html',
      'gulpfile.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
