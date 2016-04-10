/*
@license
Copyright (c) 2016 GDG Spain
This code may only be used under the MIT style license found at LICENSE.txt
*/

'use strict';

// Load custom tasks from the `gulp-tasks` directory
require('require-dir')('gulp-tasks');


var gulp = require('gulp');
var runSequence = require('run-sequence');

// Build production files, the default task
gulp.task('default', ['clean'], function(cb) {
  runSequence(
    ['copy', 'styles'],
    'html',
    'vulcanize',
    cb);
});
