/*
@license
Copyright (c) 2016 GDG Spain
This code may only be used under the MIT style license found at LICENSE.txt
*/

'use strict';

var gulp = require('gulp-task-doc');
var size = require('gulp-size');

var dist = require('./dist');

// Copy all images
gulp.task('images', function() {
  return gulp.src(['app/images/**/*'])
    .pipe(gulp.dest(dist('images')))
    .pipe(size({title: 'images'}));
});
